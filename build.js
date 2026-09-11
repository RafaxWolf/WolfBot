const fs = require("fs");
const path = require("path");
const readline = require("readline")
const crypto = require("crypto");

const fse = require("fs-extra");
const chalk = require("chalk");

const ignore = require("ignore");
const { ZipArchive } = require("archiver");

/* const timestamp = new Date().toISOString()
.replace(/[:.]/g, "-"); */

const date = new Date()
const timestamp = date.toLocaleString('en-CA', { hour12: false }).replace(',', '')
const backupTimestamp = timestamp.replace(/[:.]/g, "-")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/**
 * Makes the script wait for a specified amount of milliseconds.
 * 
 * @param {Number} ms The number of milliseconds to wait.
 * @returns {Promise} A promise that resolves after the specified time.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get the ignored files from the .buildignore file
 * 
 * @param {string} ignoreFilePath The path to the .buildignore file.
 * @returns {object} An instance of the ignore package with the patterns from the .buildignore file.
 */
function getIgnoredPaths(ignoreFilePath) {
  const ig = ignore();

  const ignoreFile = fs.readFileSync(ignoreFilePath, "utf8")

  const patterns = ignoreFile
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean); // Remove empty lines

    ig.add(patterns);
    return ig;
}

/**
 * Recursively lists all files in a directory, excluding those that match the ignore patterns.
 * 
 * @param {string} srcDir The source directory to list files from.
 * @param {object} ig An instance of the ignore package with the patterns to ignore.
 * @param {string} baseDir The base directory to calculate relative paths (default is the same as srcDir).
 * @returns {Array} An array of objects containing the source path and relative path of each file to be built.
 */
async function listFiles(srcDir, ig, baseDir = srcDir) {
    let results = []
    const allFiles = await fse.readdir(srcDir, { withFileTypes: true })

    for(const file of allFiles) {
        const srcPath = path.join(srcDir, file.name)
        const relative = path.relative(baseDir, srcPath).replace(/\\/g, "/") // Normalize Windows Paths

        if(ig.ignores(relative)) {
            console.log(chalk.yellowBright(`[!] ${relative} Ignorado.`)); 
            await sleep(20)
            continue;
        }

        if(file.isDirectory()) {
            const subFiles = await listFiles(srcPath, ig, baseDir)
            results = results.concat(subFiles)
        } else {
            results.push({ src: srcPath, relative })
        }
    }
    return results;
}

//* Hash Functions

/**
 * Calculates a hash based on the contents of the files to be built, as well as their relative paths.
 * This can be used to determine if a build is necessary by comparing the calculated hash with a previously stored hash.
 * 
 * @param {Array} files 
 * @returns {string} The calculated hash as a hexadecimal string.
 */
function hashCalc(files) {
    const hash = crypto.createHash("sha256")

    for(const file of files) {
        const fileBuffer = fs.readFileSync(file.src)

        hash.update(file.relative)
        hash.update(fileBuffer)
    }
    
    //* If the .buildignore file exists, include its contents in the hash calculation to ensure that changes to the ignore patterns also trigger a new build
    if(fs.existsSync(".buildignore")) {
        const ignoreFile = fs.readFileSync(".buildignore", "utf8")
        hash.update(ignoreFile)
    }

    return hash.digest("hex")
}

/**
 * Reads the hash from a specified file path.
 * If the file does not exist, it returns null.
 * 
 * @param {string} hashPath 
 * @returns {string | null} The hash read from the specified file, or null if the file does not exist.
 */
function hashReader(hashPath) {
    if(!fs.existsSync(hashPath)) return null;

    return fs.readFileSync(hashPath, "utf8").trim()
}

/**
 * Writes the provided hash to a specified file path.
 * If the file does not exist, it will be created.
 * 
 * @param {*} hashPath
 * @param {*} hash 
 */
function hashWriter(hashPath, hash) {
    fs.writeFileSync(hashPath, hash)
}

//* Build Functions

function writeBuildInfo(dest, buildHash, filesCount) {
    const buildInfo = {
        hash: buildHash,
        files: filesCount,
        date: timestamp,

        nodeVersion: process.version
    }

    fs.writeFileSync(path.join(dest, "buildinfo.json"), JSON.stringify(buildInfo, null, 2))
}

/**
 * Backup the existing build into a zip inside of old_builds/.
 * @param {*} buildPath The path of the existing build that will be backed up.
 * @param {*} backupDir The directory where the backup zip will be saved.
 * @returns {Promise} A promise that resolves when the backup is completed.
 */
async function backupBuild(buildPath, backupDir){
    if(!fs.existsSync(buildPath)) return; // If the backup directory doesn't exist, skip the backup process
    await fse.ensureDir(backupDir) // Ensure the backup directory exists
    const backupPath = path.join(backupDir, `build-${backupTimestamp}.zip`); // Define the backup file path

    // Create a zip archive of the existing build
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(backupPath);

        const archive = new ZipArchive({ zlib: { level: 9 } });

        output.on("close", () => {
            console.log(chalk.greenBright(`[+] Build antigua guardada en: ${backupPath} (${archive.pointer()} bytes)`));
            resolve();
        })

        archive.on("error", (err) => {
            console.error(chalk.redBright("[-] Error al crear el backup de la build antigua:\n"));
            reject(err);
        })

        archive.pipe(output);

        archive.directory(buildPath, false); // Add the build directory to the archive
        archive.finalize();
    })
}

/**
 * The main build process that copies files from the source directory to the destination directory, while showing progress and handling errors.
 * @param {*} src The Source Code Path, the Code that will be Builded.
 * @param {*} dest The Build / Dest Path, where the builded code will be saved.
 */
async function buildProcess(src, dest, buildHash) {
    try {
        for(const file of src) {
            const destPath = path.join(dest, file.relative)
            await fse.ensureDir(path.dirname(destPath))
            await fse.copy(file.src, destPath)

            //! Build Message
            console.log(chalk.greenBright(`[+] ${file.relative} Buildeado en: ${destPath}`)); 
            await sleep(10)
        }

        hashWriter(path.join(dest, ".buildhash"), buildHash) //! Save the current hash to the .buildhash file in the build directory
        writeBuildInfo(dest, buildHash, src.length) //! Write the build info to a buildinfo.json file in the build directory

        //* Ending message
        console.log()
        console.log(chalk.cyanBright("[+] Information de la Build:"))
        console.log(chalk.cyanBright(`    - Hash: ${buildHash}`))
        console.log(chalk.cyanBright(`    - Files: ${src.length}`))
        console.log(chalk.cyanBright(`    - Date: ${timestamp}`))
        console.log()

        await sleep(300)
        console.log(chalk.blueBright("[+] Build completada con éxito!"))
    } catch (error) {

        //! Error Message
        console.error(chalk.redBright("[-] Error durante el proceso de build:\n"), error);
        process.exit(1);
    }
}

//! Main function
(async () => {

    console.clear()

    console.log(chalk.greenBright("=========================================="))
    await sleep(90)
    console.log(chalk.greenBright("           Node ") + chalk.reset("Build.js Script           "))
    await sleep(90)
    console.log("           Made By " + chalk.redBright( "TheHiddenWolf           "))
    await sleep(90)
    console.log(chalk.greenBright("=========================================="))
    await sleep(600)
    console.log()
    console.log()
    console.log(chalk.cyanBright("[+] Verificando archivos a buildear..."))
    await sleep(500)
    console.log()
    
    //* Essential Folders
    const src = 'src';
    const dest = 'build';
    const tempDir = 'temp_build'; // A temporary directory used during the build process to avoid issues with copying files while the build is in progress
    const backupDir = 'old_builds';
    
    //* Ignore System
    const ignorePatterns = getIgnoredPaths(".buildignore"); //! Get ignored paths from .buildignore
    console.log(chalk.cyanBright("[/] Leyendo .buildignore..."))
    await sleep(500)
    console.log()
    
    //* Check if the source directory exists
    if (!fs.existsSync(src)) {
        console.error(chalk.redBright("[-] El directorio de origen no existe!")); //! Error Message
        process.exit(1);
    }

    //* List files to be built
    const filesToBuild = await listFiles(src, ignorePatterns);
    
    //* Calculate the hash of the files to be built
    const currentHash = hashCalc(filesToBuild);

    const hashFile = path.join(dest, ".buildhash"); //! Path to the file where the hash of the last build is stored
    const previousHash = hashReader(hashFile); //! Read the previous hash from the file

    if (previousHash && previousHash === currentHash) {
        console.log()
        console.log(chalk.greenBright("[+] No se han detectado cambios desde la última build. Proceso de build cancelado."));
        process.exit(0);
    }

    await sleep(500)

    console.log()
    console.log(chalk.cyanBright(`[+] ${filesToBuild.length} archivos encontrados a buildear.`));
    console.log()

    console.log(chalk.greenBright("[+] Iniciando la creación de la build..."))
    console.log()

    if(fs.existsSync(tempDir)) {
        await fse.remove(tempDir) //! Remove the temporary directory if it already exists to ensure a clean build
    }

    //* Create the build directory if it doesn't exist
    if(fs.existsSync(dest)) {
        console.log(chalk.yellowBright("[!] Build ya existente!"))
        console.log()
        rl.question("[?] Deseas hacer un backup de la build actual y continuar? (y/n): ", async (answer) => {
            if(answer.toLowerCase() !== 'y') {
                console.log()
                console.log(chalk.redBright("[-] Proceso de Buildeo Abortado!"))
                process.exit(1)
            }

            console.log()
            console.log(chalk.yellowBright("[!] Haciendo backup de la build actual..."))
            await backupBuild(dest, backupDir)

            console.log()
            console.log(chalk.yellowBright("[!] Eliminando build actual..."))

            await buildProcess(filesToBuild, tempDir, currentHash)

            if(fs.existsSync(dest)) {
                console.log()
                console.log(chalk.yellowBright("[!] Reemplazando la build antigua con la nueva..."))
                await fse.remove(dest) //! Remove the temporary directory used during the build process
            }

            await fse.move(tempDir, dest) //! Move the temporary build to the final destination

            rl.close();
        
        })
    } else {
        await buildProcess(filesToBuild, dest, currentHash)
        rl.close();
    }
    
})();