const fs = require("fs")

/**
 * Selects a random line from a File
 * @param {string} filename The file path from which to select random lines
 * @returns A random line of the File
 */
function getRandomLine(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf-8')
        const lines = data.split(/\r?\n/)

        const fullLine = lines.filter(line => line.trim().length > 0)
        if(fullLine.length === 0) {
            console.error("[!] Error: Archivo vacio.")
            return;
        }

        const randomIndex = Math.floor(Math.random() * fullLine)

        return fullLine[randomIndex];
    } catch (err) {
        console.error("[!] Error: " + err)
        return null;
    }
}

module.exports = getRandomLine;