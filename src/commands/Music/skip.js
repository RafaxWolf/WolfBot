module.exports = {
  name: "skip",
  alias: ["saltar"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  try {
    queue.skip()
    message.channel.send(`☑️ | Skipeado! Saltando a la canción siguiente...`)
  } catch (e) {
    message.channel.send(`❌ | ${e}`)
  }

 }

}