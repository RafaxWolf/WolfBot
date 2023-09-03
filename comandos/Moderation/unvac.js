const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: "unvac",
  alias: [""],

execute (client, message, args){

  var perms = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) 

  //define las menciones
  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!target) return message.author.send(`:x: | Para Quitarle el Vac Baneo a un usuario primero debes mencionarlo!`);

  //por si el usuario no esta vac baneado
  if(!target.roles.cache.find(rol => rol.id === "862051677720936448")) return message.reply(`El usuario **${target.user.username}** No esta Vac Baneado!`) 

  if(perms){
    message.channel.send(`El usuario **${target}** Ha sido DesVac Baneado por el moderador **${message.author}**!`).then(target.roles.add("862054591323570186")).then(target.roles.remove("862051677720936448"))
  }else {
      return message.author.send("No eres un moderador!")
  }

    }

}