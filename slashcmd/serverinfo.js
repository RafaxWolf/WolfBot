const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Ver la informacion del servidor"),

    async run(client, interaction){
      interaction.reply({ content: `Nombre del servidor: \`${interaction.guild.name}\`\nMiembros en total: **${interaction.guild.memberCount}**`, ephemeral: true })
    }
        
}