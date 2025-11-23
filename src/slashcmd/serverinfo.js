const { SlashCommandBuilder, MessageFlags } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Ver la información del servidor"),

    async run(client, interaction){
      let owner = await interaction.guild.fetchOwner()

      interaction.reply({ content: `Nombre del servidor: \`${interaction.guild.name}\`
        Miembros en total: **${interaction.guild.memberCount}**
        Dueño del servidor ${owner}`,
        flags: MessageFlags.Ephemeral })
    }
        
}