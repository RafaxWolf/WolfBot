const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const { minimatch } = require('minimatch');

console.log(chalk.blueBright("[+] Iniciando la creacion de la build..."))

// Get the ignored files from the .buildignore file
function getIgnoredPaths(ignoreFilePath) {
  const ignoreFile = fs.readFileSync(ignoreFilePath, 'utf8');
  return ignoreFile
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

// Build function without ignored files
async function buildWithIgnore(srcDir, destDir, ignoreList) {
    const allFiles = await fse.readdir(srcDir, { withFileTypes: true })

    for (const file of allFiles) {
        const srcPath = path.join(srcDir, file.name);
        const destPath = path.join(destDir, file.name);
        const relative = path.relative('.', srcPath);

        if (ignoreList.some(pattern => minimatch(relative, pattern))) {
            console.log(chalk.yellowBright(`[!] ${file.name} Ignorado.`));
            continue;
        }

        if (file.isDirectory()) {
            await buildWithIgnore(srcPath, destPath, ignoreList)
        } else {
            await fse.ensureDir(path.dirname(destPath));
            await fse.copy(srcPath, destPath);
            console.log(chalk.greenBright(`[+] ${file.name} Copiado a ${destPath}`));
        }
    }
}

// Main function
const ignoreFile = '.buildignore';
const ignorePatterns = getIgnoredPaths(ignoreFile);

(async () => {
    const src = 'src';
    const dest = 'build';

    await fse.remove(dest) // Remove the build directory if already exists
    await buildWithIgnore(src, dest, ignorePatterns); // Starts the build process
    console.log(chalk.blueBright("[+] Build completada con exito!"))
})();