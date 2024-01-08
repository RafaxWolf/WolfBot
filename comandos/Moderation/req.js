const Discord = require('discord.js');

module.exports = {
  name: "req",
  alias: [""],

execute (client, message, args){

    if(message.member.roles.cache.find(rol => rol.id >= "859855420733784084")){
        message.channel.send("Success! Moderator access granted.")
    }
    else{
       message.channel.send("Failed. Nothing found.")
    }
    var logmod = client.channels.cache.find(channel => channel.id === '1133969379072155728');
    logmod.send(`¡${message.author} Ha usado el Req!`)

 }

}