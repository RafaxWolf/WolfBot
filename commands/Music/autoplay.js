const Discord = require('discord.js');

module.exports = {
  name: "autoplay",
  alias: ["ap"],
  inVoiceChannel: true,
execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | Ho hay nada en la cola!")
  const autoplay = queue.toggleAutoplay()
  message.channel.send(`☑️ | AutoPlay: \`${autoplay ? 'Activado' : 'Desactivado'}\``)

 }

}