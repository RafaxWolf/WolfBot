const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bug-report")
    .setDescription("Reportar un bug")
    .setDMPermission(false),

    async run(client, interaction){
      const modal = new ModalBuilder()
      .setCustomId('report')
      .setTitle('Reportar un bug');

      const category = new TextInputBuilder()
      .setCustomId('category')
      .setLabel("Categoría y/o tipo de Bug")
      .setPlaceholder("(Opcional)")
      .setStyle(TextInputStyle.Short)
      .setRequired(false)

      const bugreport = new TextInputBuilder()
      .setCustomId('bugreport')
      .setLabel("Bug a reportar")
      .setPlaceholder("(Obligatorio)")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)

        const row1 = new ActionRowBuilder().addComponents(category);

        const row2 = new ActionRowBuilder().addComponents(bugreport);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);

        interaction.followUp({ content: "[+] El reporte ha sido enviado con éxito!", ephemeral: true })

    }
        
}