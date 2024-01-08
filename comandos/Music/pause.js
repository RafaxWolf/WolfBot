module.exports = {
  name: "pause",
  alias: ["stop", "hold"],
  inVoiceChannel: true,
execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola ahora mismo!")
  if (queue.paused) {
    queue.resume()
    return message.channel.send("▶️ | Reproduciendo la canción!")
  }
  queue.pause()
  message.channel.send("⏹️ | Canción pausada!")
 }

}