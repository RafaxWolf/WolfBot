const Discord = require('discord.js');

module.exports = {
  name: "shuffle",
  alias: ["barajar"],
  inVoiceChannel: true,
execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")

  queue.shuffle()
  message.channel.send("☑️ | Barajando las canciones en la cola!")

 }

}
