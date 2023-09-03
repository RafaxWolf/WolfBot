const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "report",
  alias: ["rp", "reportar"],

async execute (client, message, args){

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!user) return message.channel.send("Tienes que mencionar a un usuario para executar este comando!");
    message.author.send(`${message.author} Has reportado a ${user} Por ${reason}`)

  const row = new MessageEmbed()
  .setTimestamp()
  .setThumbnail(user.user.displayAvatarURL())
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor("RED")
  .setTitle("**Nuevo Reporte!**")
  .addField("Usuario que reporta:", `${message.author}`, true)
  .addField("Usuario Reportado:", `${user}`, true)
  .addField("Razon", `${reason}`, true)

  var canalLog = client.channels.cache.find(channel => channel.id === '991746789034184725');
  canalLog.send({ embeds: [row] })

  var canalRep = client.channels.cache.find(channel => channel.id === '927724974725271562');
  canalRep.send({ embeds: [row] })
 }

}