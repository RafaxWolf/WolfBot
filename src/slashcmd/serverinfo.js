const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Ver la información del servidor"),

    async run(client, interaction){
      let owner = await interaction.guild.fetchOwner()

      interaction.reply({ content: `Nombre del servidor: \`${interaction.guild.name}\`\nMiembros en total: **${interaction.guild.memberCount}**\nDueño del servidor ${owner}`, ephemeral: true })
    }
        
}