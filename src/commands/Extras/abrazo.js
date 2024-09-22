const Discord = require('discord.js');

module.exports = {
  name: "abrazo",
  alias: ["hug"],

execute (client, message, args){

    message.channel.send(`¡Aqui tienes un abrazo ${message.author}!`);

 }

}