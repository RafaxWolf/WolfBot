const { normalEmbedBuilder } = require('../../functions/embedBuilder')

module.exports = {
  name: "queue",
  alias: ["cola"],

async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const q = queue.songs
    .map((song, i) => `${i === 0 ? 'Escuchando:' : `${i}.`} **\`${song.uploader.name}\`** | ${song.name} - \`[${song.formattedDuration}]\`\nSolicitada por: ${song.user}`).slice(0, 11)
    .join(`\n`)
    
    const queueEmbed = normalEmbedBuilder(client, message, {
      color: "Orange",
      title: "📄 | **Cola del servidor**",
      description: q
    })

    await message.channel.send({ embeds: [queueEmbed] })

 }

}
