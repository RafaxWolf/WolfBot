module.exports = {
  name: "leave",
  alias: [""],

execute (client, message, args){
  client.distube.voices.leave(message)
  message.channel.send("☑️ | Saliendo del canal de voz...")

 }

}