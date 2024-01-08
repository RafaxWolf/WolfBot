module.exports = {
  name: "previous",
  alias: ["anterior", "prev"],
  inVoiceChannel: true,
execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")

  queue.previous()

  if(!queue.previous) return message.channel.send("asd")

 }

}
