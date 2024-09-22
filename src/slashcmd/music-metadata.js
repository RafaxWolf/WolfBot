const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const mm = require("music-metadata")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("music-metadata")
    .setDescription("asd")
    .addAttachmentOption(option =>
        option
        .setName("music")
        .setDescription("dsa")
        .setRequired(true)
    ),

    async run(client, interaction){
      const musicFile = interaction.options.getAttachment("music")

        const musicUrl = musicFile.url
        const mp3File = musicUrl.value;
        
        try {
          const metadata = await mm.parseFile(mp3File)
          const artistName = metadata.common.artist || "Desconocido"
          const albumTitle = metadata.common.album || "Desconocido"
          const songTitle = metadata.common.title || "Desconocido"

          const asd = new EmbedBuilder()
          .setTitle("asd")
          .addFields(
            { name: "Titulo", value: `**${songTitle}**` },
            { name: "Artista", value: `*${artistName}*` },
            { name: "Album", value: `*${albumTitle}*` },
          )
          .setTimestamp()
          .setColor("Default")

          interaction.reply({ embeds: [asd] })
        } catch (e) {
            console.log(e)
        }

    }
        
}