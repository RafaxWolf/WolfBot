const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "nuke",
  alias: ["nk"],

execute (client, message, args){

    var botPerms = client.user.permissions.has(PermissionsBitField.Flags.Administrator)
    if(!botPerms) return message.reply({ content: "❌ | |No tengo los permisos necesarios!" })

    var perms = message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    if (!perms) return message.channel.send("¡No tienes los permisos necesarios!")
  
    var posicion = message.channel.position;
  
    message.channel.clone().then(ch => {
      message.channel.delete()
  
      ch.setPosition(posicion)

      client.channels.cache.get(ch.id)//.send({ embeds: [nuked] })
    })

 }

}