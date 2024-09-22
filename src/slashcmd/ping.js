const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command"),

    async run(client, interaction){
        interaction.reply({ content: `Latencia de la API **${Math.round(client.ws.ping)}ms**`, ephemeral: true })
    }
        
}