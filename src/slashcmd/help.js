const { SlashCommandBuilder } = require("discord.js")
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Para saber sobre los comandos (Slash commands)"),

    async run(client, interaction){
//------------------------------------------------------------------------embeds------------------------------------------------------------------------
    const embedS1 = new EmbedBuilder()
    .setAuthor({ name: "Help", iconURL: "https://i.imgur.com/SaDhsHb.png" })
    .setTitle("Sistema de Musica")
    .setColor("Aqua")
    .setDescription(`
    **/play <string>** - Reproducir música en cualquier canal de voz
    **/stop** - Detener la reproducción de música
    **/skip** - Saltar a la siguiente canción
    **/queue** - Ver la lista de canciones en cola
    ***[FIXING]*** **/lyrics** - Ver la letra de la canción actual
    **/pause** - Pausar la reproducción de música / Reanudar la reproducción de música
    **/volume <number>** - Cambiar el volumen de la música
    **/loop <song/queue/off>** - Repetir la canción actual
    **/shuffle** - Mezclar la lista de reproducción
    **/seek <time>** - Buscar en la canción
    **/autoplay** - Activar / Desactivar la reproducción automática
    **/replay** - Repetir la canción en reproducción
    **/previous** - Reproducir la canción anterior
    ***[WIP]*** **/filter <string>** - Aplicar un filtro de audio a la música 
        `)
    .setTimestamp()
    
    //**/jump <number>** - Saltar a una canción en la lista de reproducción
    //**/remove <number>** - Eliminar una canción de la lista de reproducción
    //**/clear** - Limpiar la lista de reproducción

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
            .setLabel('Atrás')
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