const Discord = require('discord.js');

module.exports = {
  name: "req",
  alias: [""],

execute (client, message, args){

    message.delete({timeout: 5000});
    if(message.member.roles.cache.find(rol => rol.id >= "859855420733784084")){
        message.channel.send("Success! Moderator access granted.").then(msg => msg.delete({timeout: 5000}));
    }
    else{
       message.channel.send("Failed. Nothing found.").then(msg => msg.delete({timeout: 5000}));
    }
    var logmod = client.channels.cache.find(channel => channel.id === '991746789034184725');
    logmod.send(`¡${message.author} Ha usado el Req!`)

 }

}