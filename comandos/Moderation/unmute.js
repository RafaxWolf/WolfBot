const Discord = require('discord.js');
const { Permissions } = require('discord.js')
const ms = require('ms');

module.exports = {
  name: "unmute",
  alias: [""],

execute (client, message, args){

    var perms = message.member.permission.has(Permissions.FLAGS.MANAGE_MESSAGES) //permisos del mod
  
  if(perms) {

     const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //mencion

  if(user) {

    let mainrole = message.guild.roles.cache.find(role => role.id === "862054591323570186") //rol principal
    let muterole = message.guild.roles.cache.find(role => role.id === "935402755483369472") //rol mute

    user.roles.remove(muterole);
    user.roles.add(mainrole);
    message.channel.send(`El moderador **${message.author.username}** ha DesMuteado a **${user.user.username}**!`)

  }else {
    message.channel.reply("Usuario desconocido!")
  }
    }else {
        message.channel.send("No eres un moderador!")
    }

 }

}
