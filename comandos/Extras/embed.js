const Discord = require('discord.js');

module.exports = {
  name: "embed",
  alias: [""],

execute (client, message, args){

  const embedTest = new Discord.MessageEmbed()
  .setTitle("Test de Embed")
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor("RED")
  //.setDescription("asd")
  //.setFooter("XD")
  .setImage(message.author.displayAvatarURL())
  .setTimestamp()
  //.addField("Test", "XD")
  .addField("Test", "XD", true)
  .addField("Test", "XD", true)

  message.channel.send({ embed: embedTest });
  message.react('😄');

 }

}