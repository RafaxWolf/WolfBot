const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, EmbedBuilder, InteractionContextType, MessageFlags } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("prueba de botones")
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async run(client, interaction){
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Aceptar')
            .setStyle('Success'),
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Rechazar')
            .setStyle('Danger')
        )

        interaction.reply({ content: 'Acepta los términos?', components: [row] })

        const filter1 = i => i.customId === 'accept'

        const filter2 = d => d.customId === 'decline'

        const collector = interaction.channel.createMessageComponentCollector({ filter1, filter2 });
        
        collector.on('collect', async i => {
            if (i.customId === 'accept') {
                await i.update({ content: 'Has aceptado los términos y condiciones.', flags: MessageFlags.Ephemeral, components: [] })
            }
        });

        collector.on('collect', async d => {
            if (d.customId === 'decline') {
                await d.update({ content: 'Has rechazado los términos y condiciones.', flags: MessageFlags.Ephemeral, components: [] })
            }
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }    
}