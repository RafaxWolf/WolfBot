const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "replay",
  alias: ["repetir"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const song = queue.songs[0]

  await queue.seek(0)

  const replay = new EmbedBuilder()
  .setAuthor({ name: 'Repitiendo', iconURL: 'https://imgur.com/H0ebnoS.png' })
  .setTitle(song.name)
  .setURL(song.url)
  .setThumbnail(song.thumbnail)
  .addFields(
    { name: "Duración", value: `\`[${song.formattedDuration}]\`` },
    { name: "Volumen", value: `\`${queue.volume}%\``},
    { name: "Nombre del canal", value: `**\`${song.uploader.name}\`**` }
  )
  .setFooter({ text: `${song.user.username}`, iconURL: message.author.displayAvatarURL() })
  .setTimestamp()
  .setColor("Grey")

  message.channel.send({ embeds: [replay] })

 }

}