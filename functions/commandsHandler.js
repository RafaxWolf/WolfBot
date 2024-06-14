const { Collection } = require("discord.js")
const fs = require("fs")
const path = require('path')

const prefixCommands = new Collection()

let carpetas = fs.readdirSync(path.join(__dirname, '../commands/')).map((subCarpetas) => {
    const archivos = fs.readdirSync(path.join(__dirname, `../commands/${subCarpetas}`)).map((comandos) => {
      let comando = require(path.join(__dirname, `../commands/${subCarpetas}/${comandos}`)) 
        prefixCommands.set(comando.name, comando)
    });
});

module.exports = prefixCommands;
