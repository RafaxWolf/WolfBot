const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "nowplaying",
  alias: ["np"],
  //inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const song = queue.songs[0]

  const embed = new EmbedBuilder() //* Creates the 'Now Playing' Embed
  .setTitle(song.name)
  .setAuthor({ name: 'Playing Now!', iconURL: client.user.displayAvatarURL() })
  .setURL(song.url)
  .setThumbnail(song.thumbnail)
  .addFields(
      { name: "Duración", value: `\`[${queue.formattedCurrentTime} / ${song.formattedDuration}]\``, inline: true },
      { name: "Visitas", value: `**\`[${parseInt(song.views).toLocaleString()}]\`**`, inline: true },
      { name: "Likes | Dislikes", value: `\`[${parseInt(song.likes).toLocaleString()}] | [${parseInt(song.dislikes).toLocaleString()}]\``, inline: true },
      { name: "Volumen", value: `\`${queue.volume}%\``, inline: true },
      { name: "Nombre del canal", value: `**\`${song.uploader.name}\`**` },
      { name: "Source", value : `**${song.source}**`, inline: true }
    )
  .setFooter({ text: `Solicitada por: ${song.user.username}`, iconURL: song.user.displayAvatarURL()})
  .setTimestamp()
  .setColor("White")

  const nowPlay = await message.channel.send({ embeds: [embed] })

  setTimeout(() => {
    nowPlay.delete().catch(console.error)
  }, 10000)

  //! message.channel.send(`☑️ | Sonando ahora mismo: **\`${song.name}\`**${song.thumbnail}\nDuración: \`[${queue.formattedCurrentTime} / ${song.formattedDuration}]\`\nPuesta por: ${song.user}`)

 }

}