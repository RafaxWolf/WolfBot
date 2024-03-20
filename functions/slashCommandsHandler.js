const { Collection } = require("discord.js")
const fs = require("fs")
const path = require("path")

const slashCommands = new Collection();

const slashcommandsFiles = fs.readdirSync(path.join(__dirname, "../slashcmd")).filter(file => file.endsWith(".js"))

for(const file of slashcommandsFiles){
    const slash = require(path.join(__dirname, `../slashcmd/${file}`))
    console.log(`Slash Commands - ${file} cargado.`)
    slashCommands.set(slash.data.name, slash)
}

module.exports = slashCommands;
