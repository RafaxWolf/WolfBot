const { EmbedBuilder, PermissionsBitField }= require('discord.js') 
const warn = require('../../Schema/warn-schema')

module.exports = {
  name: "user",
  alias: ["userinfo"],

async execute (client, message, args){

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.author.send(":x: | Para saber la informacion de un usuario primero debes mencionarlo!");

    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.author.send(":x: | No eres un moderador")      

      if(member.permissions.has(PermissionsBitField.Flags.ManageMessages)){
        var moderador = [":white_check_mark:"]
      }

      if(!member.permissions.has(PermissionsBitField.Flags.ManageMessages)){
        var moderador = [":x:"]
      }

      if(member.roles.cache.find(role => role.id === "862051677720936448")){
        var vacBan = [":white_check_mark:"]
      }
      if(!member.roles.cache.find(role => role.id === "862051677720936448")){
        var vacBan = [":x:"]
      }

      if(member.roles.cache.find(role => role.id === "859856804477534228")){
        var hacker = [":white_check_mark:"]
      }
      if(!member.roles.cache.find(role => role.id === "859856804477534228")){
        var hacker = [":x:"]
      }
      if(member.roles.cache.find(role => role.id === "937228279063138384")){
        var vip = [":white_check_mark:"]
      }
      if(!member.roles.cache.find(role => role.id === "937228279063138384")){
        var vip = [":x:"]
      }

  const userInfo = new EmbedBuilder()
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL())
  .setColor("DarkBlue")
  .setTitle("User Info:")
  .addFields(
    { name: "Usuario:", value: `**${member.user.tag}**`, inline: true },
    { name: "Id del usuario:", value: `**${member.id}**`, inline: true },
    { name: "Esta vac baneado/a:", value: `${vacBan}`, inline: true },
    { name: "Es un/a moderador:", value: `${moderador}`, inline: true },
    { name: "Es un/a hacker:", value: `${hacker}`, inline: true },
    { name: "Es un/a VIP:", value: `${vip}`, inline: true },
  )

  message.channel.send({ embeds: [userInfo] })

 }

}