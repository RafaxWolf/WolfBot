const Discord = require('discord.js');
const { Constants } = require('discord.js')

module.exports = {
  name: "join",
  alias: ["move"],

async execute (client, message, args){
  let voiceChannel = message.member.voice.channel

  if (args[0]) {
    voiceChannel = await client.channels.fetch(args[0])
    if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel.type)) {
        return message.channel.send(`❌ | ${args[0]} no es un canal de voz valido!`)
    }
  }
  if (!voiceChannel) {
    return message.channel.send(`❌ | Debes estar en un canal de voz!`)
  }
  client.distube.voices.join(voiceChannel)
 }

}