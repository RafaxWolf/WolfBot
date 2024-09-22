const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "report",
  alias: ["rp", "reportar"],

async execute (client, message, args){

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!user) return message.channel.send("❌ | Tienes que mencionar a un usuario para ejecutar este comando!");
    message.author.send(`${message.author} Has reportado a ${user} Por ${reason}`)

  const row = new EmbedBuilder()
  .setTimestamp()
  .setThumbnail(user.user.displayAvatarURL())
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor("Red")
  .setTitle("**¡Nuevo Reporte!**")
  .addFields(
    { name: "Usuario que reporta:", value: `${message.author}`, inline: true },
    { name: "Usuario Reportado:", value: `${user}`, inline: true },
    { name: "Motivo:", value: `${reason}`, inline: true }
  )

  var canalLog = client.channels.cache.find(channel => channel.id === '991746789034184725');
  canalLog.send(`¡Nuevo Reporte!\nUsuario: ${user}, Hecho por: ${message.author}, Motivo: ${reason}`)

  var canalRep = client.channels.cache.find(channel => channel.id === '927724974725271562');
  canalRep.send({ embeds: [row] })
 }

}