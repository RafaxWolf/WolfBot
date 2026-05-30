const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "unvac",
  alias: [""],

execute (client, message, args){

  var perms = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) 

  // Definir al usuario a quitar el vac ban
  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!target) return message.author.send(`:x: | Para Quitarle el Vac Baneo a un usuario primero debes mencionarlo!`);

  // Verificar si el usuario tiene el rol de Vac Ban
  if(!target.roles.cache.find(rol => rol.id === "862051677720936448")) return message.reply(`El usuario **${target.user.username}** No esta Vac Baneado!`) 

  if(perms){
    message.channel.send(`El usuario **${target}** Ha sido DesVac Baneado por el moderador **${message.author}**!`).then(target.roles.add("862054591323570186")).then(target.roles.remove("862051677720936448"))
  } else {
    return message.author.send("No eres un moderador!")
  }

  }
}