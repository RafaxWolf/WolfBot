const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "command-status",
  alias: ["cmds"],

execute (client, message, args){

  const cmdEmbed = new EmbedBuilder()
  .setTitle("Estatus de los sistemas de Wolfbot")
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
  .addFields(
    { name: "Sistema de **Economia**", value: "\`Activo\`", inline: true },
    { name: "Sistema de **Musica**", value: "\`Activo\`", inline: true },
    { name: "Sistema de **Hacking**", value: "\`¡Work In Progress!\`", inline: true },
    { name: "Sistema de **Experiencia**", value: "Activo`", inline: true },
    { name: "Sistema de **Casino**", value: "\`¡Work In Progress!\`", inline: true },
    { name: "Sistema de **Workshop**", value: "\`¡Work In Progress!\`", inline: true },
  )

/*   message.channel.send(`
  **Estatus de los sistemas de Wolfbot:**\n 
  Sistema de **Economia** - \`Activo\`\n
  Sistema de **Musica** - \`Activo\`\n
  Sistema de **Hackeo** - \`Work In Progress...\`\n
  Sistema de **Experiencia** - \`Activo\`\n
  Sistema de **Casino** - \`Work In Progress...\`\n
  Sistema de **Workshop** - \`Work In Progress...\`
  `) */

 }

}