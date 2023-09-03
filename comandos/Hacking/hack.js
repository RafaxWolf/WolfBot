const Discord = require('discord.js');
const levels = require('../../Schema/xp-schema')

module.exports = {
  name: "hack",
  alias: [""],

async execute (client, message, args){

    const Xpdata = await levels.findOne({ userID: message.author.id, guildID: message.guild.id })
    let user = message.mentions.users.first();
    let probabilidad = Math.floor(Math.random() * 200) + 1
    let xpGanada = Math.floor(Math.random()* 10) + 1

    if (!user) return message.author.send("Tienes que mencionar a un usuario para executar este comando!")
    if(user.id === '765454346061086770') return message.author.send("No puedes hackearme!")
    if(user.id === message.author.id) return message.author.send("No puedes hackearte a ti mismo!")

    if(message.member.roles.cache.find(rol => rol.id === "859856804477534228")){
       message.channel.send(`${message.author} Esta intentando hackear a **${user.username}**`)
            if(probabilidad < 100){
              message.channel.send(`${message.author} No ha podido hackear a **${user.username}**`)
            }
            if(probabilidad > 100){
              message.channel.send(`
              ${message.author} Ha hackeado a **${user.username}**
              `).then(message.author.send(`
              Has hackeado a ${user} y gracias a eso has ganado: **${xpGanada}** de experiencia
              `))
              //.then(user.roles.add("860318628972593162")).then(user.roles.remove("862054591323570186"))
              await levels.findOneAndUpdate({ userID: message.author.id }, { xp: Xpdata.xp + 1 })
            }
        }
        else{
           message.channel.send(`❌ | No tienes el rango suficiente ${message.author}!`);
    }

 }

}