const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "addmoney",
  alias: ["addm"],

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) return message.author.send("❌ | No puedes usar este comando!")

  const user = message.mentions.users.first()
  if(!user) message.author.send("❌ | Debes mencionar a un usuario!")

  const cantidad = Number(args[1])
  if(!cantidad) return message.author.send("❌ | Debes decir una cantidad!")

  let datos = await economia.findOne({ userID: user.id, guildID: message.guild.id })
  if(!datos) {
    let nuevosdatos = new economia({
        guildID: message.guild.id,
        userID: user.id,
        dinero: 0,
        dinerobanco: 0
    })
    await nuevosdatos.save()
    return message.reply(`Los datos de ${user} están siendo guardados, use otra vez el comando.`)
    }

    await economia.findOneAndUpdate({ userID: user.id, guildID: message.guild.id }, { dinerobanco: datos.dinerobanco + cantidad })

    message.channel.send(`✅ | Se han añadido **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins a **${user}**`) 

 }

}