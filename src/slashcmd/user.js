const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, EmbedBuilder } = require("discord.js") //Importa módulos de la librería discord.js

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Ver la info de un usuario")
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Usuario al cual ver su información')
        .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
      const user = interaction.options.getUser("user") //Registra el usuario en una constante
      var botImage = client.user.displayAvatarURL({ dynamic: true }); //Imagen del Bot

      //Comprueba si el usuario es un moderador
      if(user.permissions.has(PermissionsBitField.Flags.ManageMessages)){
        var Mod = ["✅"]
      } else {
        var Mod = ["❌"]
      }

      //Comprueba si el usuario esta vac baneado
      if(user.roles.cache.find(role => role.id === "862051677720936448" )){
        var Vac = ["✅"]
      } else {
        var Vac = ("❌")
      }

      //Comprueba si el usuario es VIP
      if(user.roles.cache.find(role => role.id === "937228279063138384" )){
        var Vip = ["✅"]
      } else {
        var Vip = ("❌")
      }

      //Comprueba si el usuario es Hacker
      if(user.roles.cache.find(role => role.id = "859856804477534228")){
        var Hacker = ["✅"]
      } else {
        var Hacker = ["❌"]
      }

      //Embed con la información del usuario
      const userInfo = new EmbedBuilder()
      .setAuthor({ name: "Información del usuario:", iconURL: botImage })
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`Usuario: ${user.tag}`)
      .setFields(
        { name: "ID", value: `${user.id}` },
        { name: "Is a Moderator?", value: `${Mod}` },
        { name: "Is a Hacker?", value: `${Hacker}` },
        { name: "Is a Vip?", value: `${Vip}` },
        { name: "Is Vac Banned?", value: `${Vac}` },
      )
      .setTimestamp()

      //Envía el embed
      interaction.reply({ embeds: [userInfo], ephemeral: true })
    }
        
}