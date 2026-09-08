module.exports = {
  name: "previous",
  alias: ["anterior", "prev"],
  inVoiceChannel: true,
async execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")

  try {
    await queue.previous()
    await message.channel.send("☑️ | Volviendo a la canción anterior.")
  } catch (error) {
    await message.channel.send("❌ | No hay una canción anterior disponible.")
  }

 }

}
