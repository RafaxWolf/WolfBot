module.exports = {
  name: "join",
  alias: ["move"],
async execute (client, message, args){
  let voiceChannel = message.member.voice.channel

  if (args[0]) {
    try {
      voiceChannel = await client.channels.fetch(args[0])
    } catch (error) {
      return message.channel.send(`❌ | ${args[0]} no es un canal válido o no tengo acceso a él.`)
    }

    if(!voiceChannel?.isVoiceBased()) {
      return message.channel.send(`❌ | ${args[0]} no es un canal de voz valido!`)
    }

  }
  
  if (!voiceChannel) {
    return message.channel.send(`❌ | Debes estar en un canal de voz o das como argumento la ID de uno!`)
  }

  try {
    await client.distube.voices.join(voiceChannel)
    await message.channel.send(`☑️ | Conectado a **${voiceChannel.name}**.`)
  } catch (error) {
    console.error('Error al unirse al canal de voz:', error)
    await message.channel.send('❌ | No pude conectarme a ese canal de voz.')
  }
 }

}
