const { Collection } = require("discord.js")
const fs = require("fs")
const path = require('path')

const prefixCommands = new Collection()

/* let carpetas = fs.readdirSync(path.join(__dirname, '../commands/')).map((subCarpetas) => {
    const archivos = fs.readdirSync(path.join(__dirname, `../commands/${subCarpetas}`)).map((comandos) => {
      let comando = require(path.join(__dirname, `../commands/${subCarpetas}/${comandos}`)) 
        prefixCommands.set(comando.name, comando)
    });
}); */

let folder = fs.readdirSync(path.join(__dirname, '../commands/')).map((subfolder) => {
  const files = fs.readdirSync(path.join(__dirname, `../commands/${subfolder}`)).filter((file) => file.endsWith('.js'))
  for (const file of files) {
    const command = require(path.join(__dirname, `../commands/${subfolder}/${file}`))
    prefixCommands.set(command.name, command)
  }
})

module.exports = prefixCommands;
