const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const {  EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Ver la info de un usuario")
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Usuario al cual ver la informacion')
        .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
      const user = interaction.options.getUser("user")
      var botImage = client.user.displayAvatarURL({ dynamic: true });

      if(user.permissions.has(PermissionFlagsBits.ManageMessages)){
        var Mod = ["✅"]
      } else {
        var Mod = ["❌"]
      }

      if(user.roles.cache.find(role => role.id === "862051677720936448" )){
        var Vac = ["✅"]
      } else {
        var Vac = ("❌")
      }

      if(user.roles.cache.find(role => role.id === "937228279063138384" )){
        var Vip = ["✅"]
      } else {
        var Vip = ("❌")
      }

      if(user.roles.cache.find(role => role.id = "859856804477534228")){
        var Hacker = ["✅"]
      } else {
        var Hacker = ["❌"]
      }

      const userInfo = new EmbedBuilder()
      .setAuthor({ name: "Informacion del usuario:", iconURL: botImage })
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`Usuario: ${user.tag}`)
      .setFields(
        { name: "ID", value: `${user.id}` },
        { name: "Mod", value: `${Mod}` },
        { name: "Hacker", value: `${Hacker}` },
        { name: "Vip", value: `${Vip}` },
        { name: "Vac Banned", value: `${Vac}` },
      )
      .setTimestamp()

      interaction.reply({ embeds: [userInfo], ephemeral: true })
    }
        
}