const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "volume",
  alias: ["volumen", "set-volume"],
  inVoiceChannel: true,
execute (client, message, args){
  //let admin = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)

//if (!admin) return message.channel.send(`${message.author} No eres un moderador!\n\`Solo los moderadores pueden usar el comando de volumen!\``)

  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")
  const volume = parseInt(args[0])
  if (isNaN(volume)) return message.channel.send(`🔊 | El volumen actual es: **\`${queue.volume}%\`**`)
  if (volume >= 101) return message.channel.send("❌ | No se puede poner el volumen a mas de 100!")
  queue.setVolume(volume)

  message.channel.send(`☑️ | Volumen ajustado al **\`${volume}%\`**`)

 }

}