const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "command-status",
  alias: ["cmds", "cmd-s"],

execute (client, message, args){

  const embed = new EmbedBuilder()
  .setTitle("Estatus de los sistemas de Wolfbot")
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
  .addFields(
    { name: ":green_circle: Sistema de **Economia**", value: "\`Activo\`", inline: true },
    { name: ":red_circle: Sistema de **Música**", value: "\`Activo\`", inline: true },
    { name: ":green_circle: Sistema de **Experiencia**", value: "Activo`", inline: true },
    { name: ":yellow_circle: Sistema de **Hacking**", value: "\`Inactivo\`", inline: true },
    { name: ":yellow_circle: Sistema de **Casino**", value: "\`Inactivo\`", inline: true },
    { name: ":yellow_circle: Sistema de **Workshop**", value: "\`Inactivo\`", inline: true },
  )

  message.channel.send({ embeds: [embed] })

 }

}