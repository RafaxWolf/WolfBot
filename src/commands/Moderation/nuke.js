const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "nuke",
  alias: ["nk"],

execute (client, message, args){

    const perms = message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    if (!perms) return message.author.send("❌ | ¡No tienes los permisos necesarios!")
  
  setTimeout(() => {
    const position = message.channel.position;
  
    message.channel.clone().then(ch => {
      message.channel.delete()
  
      ch.setPosition(position)

      const nukedEmbed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
      .setTitle("¡Canal Nukeado!")
      .setDescription(`¡El canal **${ch.name}** ha sido Nukeado por ${message.author}!`)
      .setTimestamp()
      .setColor("DarkRed")

      client.channels.cache.get(ch.id).send({ embeds: [nukedEmbed] })
    })
  }, 1000)

 }

}