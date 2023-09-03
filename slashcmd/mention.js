const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mention")
    .setDescription("asd")
    .addUserOption(option => 
        option
            .setName("user")
            .setDescription("Usuario a mencionar")
            .setRequired(true)
            ),
    async run(client, interaction){
      const user = interaction.options.getUser("user")
      interaction.reply({ content: `Usuario: ${user}` })
    }
        
}