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

  const total = song.duration * 1000
  const current = queue.currentTime * 1000
  const songProgress = total > 0 ? progressbar.splitBar(total, current, 25)[0] : '🔴 EN DIRECTO'
  const requester = song.user || message.author

  const embed = new EmbedBuilder() //* Creates the 'Now Playing' Embed
  .setTitle(song.name)
  .setAuthor({ name: 'Reproduciendo ahora', iconURL: client.user.displayAvatarURL() })
  .setDescription(`**Duración**\n\`[${queue.formattedCurrentTime}] ${songProgress} [${song.formattedDuration}]\``)
  .addFields(
      { name: "Visitas", value: `\`${Number.isFinite(song.views) ? song.views.toLocaleString() : 'No disponible'}\``, inline: true },
      { name: "Volumen", value: `\`${queue.volume}%\``, inline: true },
      { name: "Nombre del canal", value: `**\`${song.uploader?.name || 'Desconocido'}\`**`, inline: true },
      { name: "Source", value : `**${song.source}**`, inline: true }
    )
  .setFooter({ text: `Solicitada por: ${requester.username}`, iconURL: requester.displayAvatarURL()})
  .setTimestamp()
  .setColor("White")

  if (song.url) embed.setURL(song.url)
  if (song.thumbnail) embed.setThumbnail(song.thumbnail)

  const nowPlay = await message.channel.send({ embeds: [embed] })

  setTimeout(() => {
    nowPlay.delete().catch(console.error)
  }, 20000)

 }

}
