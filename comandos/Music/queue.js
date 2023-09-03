const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "queue",
  alias: ["cola"],

execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return ("❌ | No hay nada en la cola!")
  const q = queue.songs
    .map((song, i) => `${i === 0 ? 'Escuchando:' : `${i}.`} **\`${song.uploader.name}\`** | ${song.name} - \`[${song.formattedDuration}]\`\nSolicitada por: ${song.user}`).slice(0, 11)
    .join(`\n`)
//    message.channel.send(`📄 | **Cola del servidor**\n${q}`)
    const queueEmbed = new EmbedBuilder()
    .setTitle("📄 | **Cola del servidor**")
    .setDescription(q)
    .setColor("Orange")

    message.channel.send({ embeds: [queueEmbed] })
 }

}