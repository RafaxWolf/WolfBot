module.exports = {
  name: "leave",
  alias: [""],
  inVoiceChannel: true,
execute (client, message, args){
  const queue = client.distube.getQueue(message.guild)
  if (!queue) return message.channel.send("❌ | No estoy reproduciendo música en este servidor!")

  client.distube.voices.leave(message.guild)
  message.channel.send("☑️ | Saliendo del canal de voz...")

 }

}
