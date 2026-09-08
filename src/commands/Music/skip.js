module.exports = {
  name: "skip",
  alias: ["saltar"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  try {
    await queue.skip()
    message.channel.send(`☑️ | Saltando a la canción siguiente...`)
  } catch (e) {
    message.channel.send(`❌ | Ha ocurrido un error al saltar a la siguiente canción:\n${e}`)
  }

 }

}
