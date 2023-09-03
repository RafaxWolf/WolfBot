const { PermissionsBitField } = require('discord.js')
const ms = require('ms');

module.exports = {
  name: "mute",
  alias: [""],

execute (client, message, args){

  var perms = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) //permisos del mod
  if(perms) {

     const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //mencion

  if(user) {

    let mainrole = message.guild.roles.cache.find(role => role.name === "usuario") //rol principal
    let muterole = message.guild.roles.cache.find(role => role.name === "gay") //rol mute

    if(!args[1]){

      user.roles.remove(mainrole);
      user.roles.add(muterole);
      message.channel.send(`El usuario **${user.user.username}** ha sido muteado por **${message.author.username}** por tiempo *indefinido*!`);
      return
    }

    user.roles.remove(mainrole);
    user.roles.add(muterole);
    message.channel.send(`El usuario **${user.user.username}** ha sido muteado por **${message.author.username}** por *${ms(ms(args[1]))}*!`)

    setTimeout(function () {
      user.roles.remove(muterole);
      user.roles.add(mainrole);
    },ms(args[1]));

  }else {
    message.channel.send("Usuario desconocido!") //err de no mencion
  }
  message.delete({timeout: 100})
  }else {
    message.channel.send("No eres un moderador!")
  }

 }

}
