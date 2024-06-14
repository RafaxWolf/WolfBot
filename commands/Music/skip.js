const Discord = require('discord.js');

module.exports = {
  name: "skip",
  alias: ["saltar"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  try {
    const song = await queue.skip()
    message.channel.send(`☑️ | Skipeado! Sonando ahora:\n${song.name}`)
  } catch (e) {
    message.channel.send(`❌ | ${e}`)
  }

 }

}