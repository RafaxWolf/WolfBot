//* Importaciones
const { Collection } = require("discord.js")
const fs = require("fs")
const path = require("path")

function centerText(text, width){
    const padding = Math.max(0, Math.floor((width - text.length) / 2))
    return ' '.repeat(padding) + text + ' '.repeat(padding)
}

// Crea la Collection para los Slash Commands
const slashCommands = new Collection();

// Detecta los Slash Commands Existentes
const slashcommandsFiles = fs.readdirSync(path.join(__dirname, "../slashcmd")).filter(file => file.endsWith(".js")) 

// Calcula el archivo con el nombre mas largo
const maxLength = Math.max(...slashcommandsFiles.map(file => file.length))

// Definir el ancho de la lista de Slash Commands
const totalWidth = maxLength + 21; // +10 para el texto adicional y los espacios

// Header centrado
const headerText = "Slash Commands cargados:";
const consoleWidth = Math.max(totalWidth, headerText.length + 4) // Asegurarse que sea del ancho del Header

console.log("╔" + "═".repeat(consoleWidth - 2) + "╗");
console.log("║" + centerText(headerText, consoleWidth - 2) + "║");
console.log("╚" + "═".repeat(consoleWidth - 2) + "╝");

console.log("╔" + "═".repeat(totalWidth) + "╗");
slashcommandsFiles.forEach((file, index) => {
    const slash = require(path.join(__dirname, `../slashcmd/${file}`));
    const paddedFile = file.padEnd(maxLength, ' '); // Rellenar con espacios para alinear
    console.log(`║ ✔️ Slash Commands - ${paddedFile} ║`);
    if (index < slashcommandsFiles.length - 1) {
        console.log("╟" + "─".repeat(totalWidth) + "╢");
    }
    slashCommands.set(slash.data.name, slash);
});
console.log("╚" + "═".repeat(totalWidth) + "╝");

/* 
for(const file of slashcommandsFiles){
    const slash = require(path.join(__dirname, `../slashcmd/${file}`))
    console.log(`✔️ | Slash Commands - ${file} cargado.`)
    slashCommands.set(slash.data.name, slash)
} */

module.exports = slashCommands;