const fs = require("fs");
const readline = require("readline")
const cliProgress = require("cli-progress");
const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const { minimatch } = require('minimatch');

console.log(chalk.greenBright("[+] Iniciando la creación de la build..."))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//* Get the ignored files from the .buildignore file
function getIgnoredPaths(ignoreFilePath) {
  const ignoreFile = fs.readFileSync(ignoreFilePath, 'utf8');
  return ignoreFile
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

//* List all files to build
async function listFiles(srcDir, ignoreList, baseDir = srcDir) {
    let results = []
    const allFiles = await fse.readdir(srcDir, { withFileTypes: true })

    for(const file of allFiles) {
        const srcPath = path.join(srcDir, file.name)
        const relative = path.relative(baseDir, srcPath)

        if (ignoreList.some(pattern => minimatch(relative, pattern))) {
            console.log(chalk.yellowBright(`[!] ${file.name} Ignorado.`)); 
            continue; //* Skip ignored files
        }

        if(file.isDirectory()) {
            const subFiles = await listFiles(srcPath, ignoreList, baseDir)
            results = results.concat(subFiles)
        } else {
            results.push({ src: srcPath, relative })
        }
    }
    return results;
}

//! Deprecated
////Build function without ignored files
/* 
async function buildWithIgnore(srcDir, destDir, ignoreList) {
    const allFiles = await fse.readdir(srcDir, { withFileTypes: true })

    for (const file of allFiles) {
        const srcPath = path.join(srcDir, file.name); //! Source Path
        const destPath = path.join(destDir, file.name); //? Build Path
        const relative = path.relative('.', srcPath); //* Relative Path for matching

        //? Check if the file matches any ignore pattern
        if (ignoreList.some(pattern => minimatch(relative, pattern))) {
            //! Ignore Message
            console.log(chalk.yellowBright(`[!] ${file.name} Ignorado.`)); 
            continue; //* Skip ignored files
        }

        // If it's a directory, recursively build its contents
        if (file.isDirectory()) {
            await buildWithIgnore(srcPath, destPath, ignoreList)
        } else {
            await fse.ensureDir(path.dirname(destPath));
            await fse.copy(srcPath, destPath);
            
            //! Build Message
            console.log(chalk.greenBright(`[+] ${file.name} Buildeado en: ${destPath}`)); 
        }
    }
}
*/

//! Main function
(async () => {
    //* Essential Folders
    const src = 'src';
    const dest = 'build';

    //* Ignore System
    const ignoreFile = '.buildignore'; // Ignore file that contains patterns to ignore
    const ignorePatterns = getIgnoredPaths(ignoreFile); //! Get ignored paths from .buildignore

    //* Check if the source directory exists
    if (!fs.existsSync(src)) {
        console.log(chalk.redBright("[-] El directorio de origen no existe!")); //! Error Message
        process.exit(1);
    }

    const filesToBuild = await listFiles(src, ignorePatterns);

    const progressBar = new cliProgress.SingleBar({
        format: 'Progreso | {bar} {percentage}% | {value}/{total} Archivos Buildeados',
        barCompleteChar: '█',
        barIncompleteChar: '░',
        hideCursor: true,
    }, cliProgress.Presets.shades_classic);

    /**
     * 
     * @param {*} src The Source Code Path, the Code that will be Builded.
     * @param {*} dest The Biuld / Dest Path, where the builded code will be saved.
     */
    async function buildProcess(src, dest) {
        try {
            progressBar.start(filesToBuild.length, 0);
            let count = 0;
            for(const file of filesToBuild) {
                const destPath = path.join(dest, file.relative)
                await fse.ensureDir(path.dirname(destPath))
                await fse.copy(file.src, destPath)

                //? Progress Bar Update
                count++;
                progressBar.update(count);

                //! Build Message
                console.log(chalk.greenBright(`[+] ${file.relative} Buildeado en: ${destPath}`)); 
            }

            //* Ending message
            progressBar.stop();
            console.log(chalk.blueBright("[+] Build completada con éxito!"))
            process.exit(0);
        } catch (error) {

            //! Error Message
            console.error(chalk.redBright("[-] Error durante el proceso de build:\n"), error);
            process.exit(1);
        }
    }
    

    //* Create the build directory if it doesn't exist
    if(fs.existsSync(dest)) {
        console.log(chalk.yellowBright("[!] Build directory already exists!")); //! Warning Message
        rl.question("[?] Would you like to delete the actual Build and Continue with the Building process? (y/n): ", async (answer) => {
            if(answer.toLowerCase() !== 'y') {
                    console.log(chalk.redBright("[-] Build process aborted!")); //! Abort Message
                    process.exit(1)
            } else {
                console.log(chalk.yellowBright("[!] Eliminando build actual...")); //! Delete Message
                await fse.remove(dest) //! Remove the build directory if already exists
                buildProcess(src, dest) // Start the build process
                
            }
        })
    } else {
        buildProcess(src, dest) // Start the build process
        
    }
    
})();