const { EmbedBuilder } = require("discord.js")
const progressbar = require("string-progressbar")

module.exports = {
  name: "nowplaying",
  alias: ["np"],
  //inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const song = queue.songs[0]

  var total = song.duration * 1000 //? Duración total de la canción
  var current = queue.currentTime * 1000 //? Duración actual de la canción 

  var songProgress = progressbar.splitBar(total, current, 25)[0] //? Barra de progreso de la canción

  const embed = new EmbedBuilder() //* Creates the 'Now Playing' Embed
  .setTitle(song.name)
  .setAuthor({ name: 'Playing Now!', iconURL: client.user.displayAvatarURL() })
  .setURL(song.url)
  .setThumbnail(song.thumbnail)
  .setDescription(`**Duración**\n\`[${queue.formattedCurrentTime}] ${songProgress} [${song.formattedDuration}]\``)
  .addFields(
      { name: "Visitas", value: `**\`[${parseInt(song.views).toLocaleString()}]\`**`, inline: true },
      { name: "Likes | Dislikes", value: `\`[${parseInt(song.likes).toLocaleString()}] | [${parseInt(song.dislikes).toLocaleString()}]\``, inline: true },
      { name: "Volumen", value: `\`${queue.volume}%\``, inline: true },
      { name: "Nombre del canal", value: `**\`${song.uploader.name}\`**`, inline: true },
      { name: "Source", value : `**${song.source}**`, inline: true }
    )
  .setFooter({ text: `Solicitada por: ${song.user.username}`, iconURL: song.user.displayAvatarURL()})
  .setTimestamp()
  .setColor("White")

  const nowPlay = await message.channel.send({ embeds: [embed] })

  setTimeout(() => {
    nowPlay.delete().catch(console.error)
  }, 20000)

 }

}