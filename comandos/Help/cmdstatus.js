const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "command-status",
  alias: ["cmds"],

execute (client, message, args){

  const helpEmbed = new EmbedBuilder()
  .setTitle("Ayuda/Help")
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })

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