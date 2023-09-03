const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("giverole")
    .setDescription("asd"),

    async run(client, interaction){
      interaction.roles.add("1059684495332233347")
    }
        
}