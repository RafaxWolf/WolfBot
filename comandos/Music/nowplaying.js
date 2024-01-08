const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "nowplaying",
  alias: ["np"],
  inVoiceChannel: true,
execute (client, message, args){
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
      { name: "Visitas", value: `**\`[${song.views}]\`**`, inline: true },
      { name: "Likes | Dislikes", value: `\`[${song.likes}] | [${song.dislikes}]\``, inline: true },
      { name: "Volumen", value: `\`${queue.volume}%\``, inline: true },
      { name: "Nombre del canal", value: `**\`${song.uploader.name}\`**` },
      { name: "Source", value : `**${song.source}**`, inline: true }
    )
  .setFooter({ text: `${song.user.username}`, iconURL: song.user.displayAvatarURL()})
  .setTimestamp()
  .setColor("White")

  message.channel.send({ embeds: [embed] })

  //! message.channel.send(`☑️ | Sonando ahora mismo: **\`${song.name}\`**${song.thumbnail}\nDuración: \`[${queue.formattedCurrentTime} / ${song.formattedDuration}]\`\nPuesta por: ${song.user}`)

 }

}