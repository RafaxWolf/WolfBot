const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "ban",
  alias: [""],

execute (client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES") //permisos del moderador

  let ms = args[2]

  let mainrole = message.guild.roles.cache.find(role => role.id === "862054591323570186")
  let banrole = message.guild.roles.cache.find(role => role.id === "935623139025620992")

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //mencion

  if(!user) return message.reply("Tienes que mencionar a uun usuario!")
  if(!reason) return message.reply(`Debes poner una razon para banear al usuario ${user.user.username}!`)

  if(perms){
    if(!args[1]){
      const ban = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTitle("Nuevo Baneado!")
      .setColor("RED")
      .addField("Moderador:", `**${message.author.username}**`, true)
      .addField("Baneado:", `**${user.user.username}**`, true)
      .setTimestamp()

      message.channel.send({ embed: ban })
      setTimeout(function () {
        user.roles.remove(mainrole);
        user.roles.add(banrole);
      },ms(args[2]));
    }

    const tempban = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Nuevo Baneado!")
    .setColor("RED")
    .addField("Moderador:", `**${message.author.username}**`, true)
    .addField("Baneado:", `**${user.username}**`, true)
    .addField("Durante", `**${ms(ms(args[2]))}**`)
    .setTimestamp()

    message.channel.send({ embed: tempban })
    setTimeout(function () {
      user.roles.remove(mainrole);
      user.roles.add(banrole);
    },ms(args[2]));
  }else {
    message.author.send("No eres un moderador!")
  }
  message.delete({timeout: 100})

 }

}
