const Discord = require('discord.js');

module.exports = {
  name: "pause",
  alias: ["stop", "hold"],
  inVoiceChannel: true,
execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola ahora mismo!")
  if (queue.paused) {
    queue.resume()
    return message.channel.send("▶️ | Reproduciendo la cancion!")
  }
  queue.pause()
  message.channel.send("⏹️ | Cancion pausada!")
 }

}