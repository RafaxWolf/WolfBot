// Librerías
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Ver la info de un usuario")
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Usuario al cual ver su información')
        .setRequired(true)
      )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
      const user = interaction.options.getUser("user") //Registra el usuario en una constante
      var botImage = client.user.displayAvatarURL({ dynamic: true }); //Imagen del Bot

//---------------- Lista de tipos de usuario ----------------
      var mod = ["❌"]
      var vac = ("❌")
      var vip = ("❌")
      var hacker = ["❌"]
      var bot = ["❌"]
//-----------------------------------------------------------

      //Comprueba si el usuario es un moderador
      if(user.permissions.has(PermissionsBitField.Flags.ManageMessages)){
        var mod = ["✅"]
      } 

      //Comprueba si el usuario esta vac baneado
      if(user.roles.cache.find(role => role.id === "862051677720936448" )){
        var vac = ["✅"]
      } 

      //Comprueba si el usuario es VIP
      if(user.roles.cache.find(role => role.id === "937228279063138384" )){
        var vip = ["✅"]
      } 

      //Comprueba si el usuario es Hacker
      if(user.roles.cache.find(role => role.id = "859856804477534228")){
        var hacker = ["✅"]
      } 

      if(user.bot){
        var bot = ["✅"]
      }

      //Embed con la información del usuario
      const userInfo = new EmbedBuilder()
      .setAuthor({ name: "Información del usuario:", iconURL: botImage })
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`Usuario: ${user.tag}`)
      .setFields(
        { name: "ID", value: `${user.id}` },
        { name: "Es un Bot?", value: `${bot}` },
        { name: "Es un Moderator?", value: `${mod}` },
        { name: "Es un Hacker?", value: `${hacker}` },
        { name: "Es Vip?", value: `${vip}` },
        { name: "Esta Vac Baneado?", value: `${vac}` },
      )
      .setTimestamp()

      //Envía el embed
      interaction.reply({ embeds: [userInfo], flags: MessageFlags.Ephemeral })

    }
        
}