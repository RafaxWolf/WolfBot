const Discord = require('discord.js');

module.exports = {
  name: "quiereme",
  alias: [""],

execute (client, message, args){

    console.log(message.content)
        message.channel.send(`¡Yo te quiero ${message.author}!`)

 }

}