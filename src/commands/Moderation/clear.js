const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "clear",
  alias: ["purge"],

execute (client, message, args){

  var perms = message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  if(!perms) return message.reply({ content: "❌ | No tienes los permisos necesarios!" })

  const valor = parseInt(args[0]);
  if(!valor) return message.reply("❌ | Debes escribir una cantidad de mensajes para eliminar!")
  if(valor >= 100) return message.reply("❌ | No puedo eliminar mas de 99 mensajes a la vez!")


  message.channel.bulkDelete(valor + 1, true)
//    filterOld: true)

  message.channel.send(`☑️ | Se han eliminado **${valor}** mensajes correctamente!`)
//  setTimeout(() => {
//    message.delete()
//  }, 3000)
 }

}