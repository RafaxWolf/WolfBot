const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "replay",
  alias: ["repetir"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const song = queue.songs[0]

  try {
    await queue.seek(0)
  } catch (error) {
    return message.channel.send('❌ | No pude reiniciar la canción actual.')
  }

  const replay = new EmbedBuilder()
  .setAuthor({ name: 'Repitiendo', iconURL: 'https://imgur.com/H0ebnoS.png' })
  .setTitle(song.name)
  .addFields(
    { name: "Duración", value: `\`[${song.formattedDuration}]\`` },
    { name: "Volumen", value: `\`${queue.volume}%\``},
    { name: "Nombre del canal", value: `**\`${song.uploader?.name || 'Desconocido'}\`**` }
  )
  .setFooter({ text: `${song.user.username}`, iconURL: message.author.displayAvatarURL() })
  .setTimestamp()
  .setColor("Grey")

  if (song.url) replay.setURL(song.url)
  if (song.thumbnail) replay.setThumbnail(song.thumbnail)

  message.channel.send({ embeds: [replay] })

 }

}
