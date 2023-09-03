const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bug-report")
    .setDescription("Reportar un bug")
    .setDMPermission(false),

    async run(client, interaction){
      const modal = new ModalBuilder()
      .setCustomId('report')
      .setTitle('Reportar un bug');

      const category = new StringSelectMenuBuilder()
      .setCustomId('category')

        const bugged = new TextInputBuilder()
        .setCustomId('buginput')
        .setLabel("Bug a reportar")
        .setPlaceholder("ASD")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)

        const row1 = new ActionRowBuilder().addComponents(category);

        const row2 = new ActionRowBuilder().addComponents(bugged);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);

    }
        
}