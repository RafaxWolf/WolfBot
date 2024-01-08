const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "vac",
  alias: ["VAC", "vacBan", "VacBan", "Vac-ban"],

async execute (client, message, args) {

   //var perms = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) //Los permisos que necesita el moderador
    //if(!perms) return message.author.send("❌ | Permissions Error | ❌\nNo puedes utilizar este comando!")

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]); //La mención al usuario
    if(!target) return message.author.send(`:x: | Para Vac Banear a un usuario debes mencionarlo ${message.author}`);
    if(target.id === "765454346061086770") return message.author.send(`:x: | No puedes VAC BANEARME ${message.author}`);
    if(target.id === message.author.id) return message.author.send(":x: | No puedes VAC BANEARTE a ti mismo!");

    let reason = args.slice(1).join(" "); //La razon del VAC Baneo
    if(!reason) return message.channel.send(`Añade una razon para VAC BANEAR al usuario **${target.user.username}**`);

    //if(message.member.roles.highest.comparePositionTo(target.roles.highest) <= 0) return message.author.send(`No puedes VAC BANEAR a alguien con tu mismo o mayor rango ${message.author}!`); //Prohibir VAC Baneo a roles iguales o mayores

    if(target.roles.cache.find(rol => rol.id === "862051677720936448")) return message.channel.send(`El usuario ${target} ya esta Vac Baneado!`); //Si el target ya esta VAC Baneado

    const embedVac = new EmbedBuilder() //Crea el Message Embed
    .setAuthor({ name: message.author, iconURL: message.author.displayAvatarURL() })
    .setTitle("**¡Vac Ban!**")
    .setThumbnail(target.displayAvatarURL())
    .setColor("DarkRed")    
    .addFields(
      { name: "Moderador", value: `${message.author}`, inline: true },
      { name: "VAC Baneado", value: `${target}`, inline: true },
      { name: "Razon", value: `**\`${reason}\`**`, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
//    .addField("Moderador: ", `${message.author}`, true)
//    .addField("Vac Baneado: ", `${target.user}`, true)
//    .addField("Por la razon: ", `**${reason}**`, true)

    if(target.roles.cache.find(role => role.id === "862054591323570186")) {
      target.roles.remove("862054591323570186") //Remueve el rol Usuario
      target.roles.add("862051677720936448") // Añade el rol Vac Banned
      message.channel.send({ embeds: [embedVac] }) // Envía el embed al canal de texto actual
    }


 }

}