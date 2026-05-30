const fs = require("fs");
const path = require("path");
const readline = require("readline")

const fse = require("fs-extra");
const chalk = require("chalk");

const ignore = require("ignore");
const { ZipArchive } = require("archiver");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Makes the script wait for a specified amount of milliseconds.
 * @param {Number} ms The number of milliseconds to wait.
 * @returns {Promise} A promise that resolves after the specified time.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get the ignored files from the .buildignore file
 * @param {string} ignoreFilePath 
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

/**
 * Backup the existing build into a zip inside of old_builds/.
 * @param {*} buildPath The path of the existing build that will be backed up.
 * @param {*} backupDir The directory where the backup zip will be saved.
 * @returns {Promise} A promise that resolves when the backup is completed.
 */
async function backupBuild(buildPath, backupDir){
    if(!fs.existsSync(buildPath)) return; // If the backup directory doesn't exist, skip the backup process
    await fse.ensureDir(backupDir) // Ensure the backup directory exists

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Create a timestamp for the backup file
    const backupPath = path.join(backupDir, `build-${timestamp}.zip`); // Define the backup file path

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

//! Main function
(async () => {

    console.clear();

    console.log(chalk.blueBright("=========================================="))
    sleep(1000)
    console.log(chalk.blueBright("           Node.Js Build Script           "))
    sleep(1000)
    console.log(chalk.blueBright("=========================================="))
    sleep(1000)
    console.log()
    console.log(chalk.greenBright("[+] Iniciando la creación de la build..."))
    sleep(5000)

    //* Essential Folders
    const src = 'src';
    const dest = 'build';
    const backupDir = 'old_builds';

    //* Ignore System
    const ignorePatterns = getIgnoredPaths(".buildignore"); //! Get ignored paths from .buildignore

    //* Check if the source directory exists
    if (!fs.existsSync(src)) {
        console.log(chalk.redBright("[-] El directorio de origen no existe!")); //! Error Message
        process.exit(1);
    }

    const filesToBuild = await listFiles(src, ignorePatterns);
    console.log()
    console.log(chalk.cyanBright(`[+] ${filesToBuild.length} archivos encontrados para buildear.`));
    console.log()


    /**
     * The main build process that copies files from the source directory to the destination directory, while showing progress and handling errors.
     * @param {*} src The Source Code Path, the Code that will be Builded.
     * @param {*} dest The Build / Dest Path, where the builded code will be saved.
     */
    async function buildProcess(src, dest) {
        try {
            for(const file of filesToBuild) {
                const destPath = path.join(dest, file.relative)
                await fse.ensureDir(path.dirname(destPath))
                await fse.copy(file.src, destPath)

                //! Build Message
                console.log(chalk.greenBright(`[+] ${file.relative} Buildeado en: ${destPath}`)); 
            }

            //* Ending message
            console.log()
            console.log(chalk.blueBright("[+] Build completada con éxito!"))
            sleep(300)
            process.exit(0);
        } catch (error) {

            //! Error Message
            console.error(chalk.redBright("[-] Error durante el proceso de build:\n"), error);
            process.exit(1);
        }
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
            await fse.remove(dest)

            await buildProcess(src, dest)
            rl.close();
        
        })
    } else {
        await buildProcess(src, dest)
        rl.close();
    }
    
})();