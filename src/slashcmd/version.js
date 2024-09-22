const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")
const { version } = require('../package.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Ver la actual version de WolfBot!"),

    async run(client, interaction){
      interaction.reply({ content: `Version actual: **${version}**`, ephemeral: true })
    }
        
}