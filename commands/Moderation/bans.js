const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "ban",
  alias: [""],

execute (client, message, args){

  var perms = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) //permisos del moderador
  if(!perms) return message.reply({ content: "❌ | No tienes los permisos necesarios!" })

  let ms = args[1]

  let mainrole = message.guild.roles.cache.find(role => role.id === "862054591323570186")
  let banrole = message.guild.roles.cache.find(role => role.id === "935623139025620992")

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //mención

  if(!user) return message.reply("Tienes que mencionar a uun usuario!")
  if(!reason) return message.reply(`Debes poner una razon para Banear al usuario ${user.user.username}!`)

  if(perms){
    if(!args[2]){
      const ban = new EmbedBuilder()
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

    const tempban = new EmbedBuilder()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("Nuevo Baneado!")
    .setColor("RED")
    .addField("Moderador:", `**${message.author.username}**`, true)
    .addField("Baneado:", `**${user.username}**`, true)
    .addField("Durante", `**${ms(ms(args[1]))}**`)
    .setTimestamp()

    message.channel.send({ embed: tempban })
    setTimeout(function () {
      user.roles.remove(mainrole);
      user.roles.add(banrole);
    },ms(args[1]));
  }

 }

}
