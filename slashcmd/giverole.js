const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("giverole")
    .setDescription("asd")
    .addUserOption(option =>
      option
      .setName("user")
      .setDescription("user")),

    async run(client, interaction){
      interaction.roles.add("1059684495332233347")
    }
        
}