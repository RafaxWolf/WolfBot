const Discord = require('discord.js');

module.exports = {
  name: "asd",
  alias: [""],

execute (client, message, args){
  let role = message.mentions.roles.first()
  message.channel.send(`Rol mencionado: ${role}`)

 }

}