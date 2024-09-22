const { SlashCommandBuilder } = require("discord.js")
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Para saber sobre los comandos (Slash commands)"),

    async run(client, interaction){
//------------------------------------------------------------------------embeds------------------------------------------------------------------------
    const embedS1 = new EmbedBuilder()
    .setTitle("Help pagina 1/2")
    .setColor("Aqua")
    .setDescription("asd")
    .setTimestamp()

    const embedS2 = new EmbedBuilder()
    .setTitle("Help pagina 2/2")
    .setColor("Aqua")
    .setDescription("asd")
    .setTimestamp()
//------------------------------------------------------------------------embeds------------------------------------------------------------------------

        const SC1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('next1')
            .setLabel('Siguiente')
            .setEmoji('➡')
            .setStyle(ButtonStyle.Secondary)
        )

        const SC2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('before1')
            .setLabel('Atras')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⬅')
        )

        interaction.reply({ embeds: [embedS1], ephemeral: true, components: [SC1] })

      const filterA = a => a.customId === 'next1'
      const filterB = b => b.customId === 'before1'

      const collector = interaction.channel.createMessageComponentCollector({ filterA, filterB });

      collector.on('collect', async a => {
        if (a.customId === 'next1') {
            await a.update({ embeds: [embedS2], ephemeral: true, components: [SC2] })
        }
    })
      collector.on('collect', async b => {
        if (b.customId === 'before1') {
            await b.update({ embeds: [embedS1], ephemeral: true, components: [SC1] })
        }
    })

    }
        
}