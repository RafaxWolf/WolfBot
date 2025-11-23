const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "addmoney",
  alias: ["añadir-dinero"],

async execute (client, message, args){

  const user = message.mentions.users.first() || message.author
  ////if(!user) message.author.send("❌ | Debes mencionar a un usuario!")
  const cantidad = Number(args[1])
  if(!cantidad) return message.author.send("❌ | Debes decir una cantidad!")


  async function addmoney(user, guild) {
    let datos = await economia.findOne({ userID: user, guildID: guild })
    if(!datos) {
      let nuevosdatos = new economia({
          guildID: message.guild.id,
          userID: user.id,
          dinero: 0,
          dinerobanco: 0
      })
      await nuevosdatos.save()
      return message.reply(`Los datos de ${user} están siendo guardados, use otra vez el comando.`)
      } else {
        await economia.findOneAndUpdate({ userID: user.id, guildID: message.guild.id }, { dinerobanco: datos.dinerobanco + cantidad })
      }
  }

    addmoney(user.id, message.guild.id)
    message.channel.send(`✅ | Se han añadido **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins a **${user}**`) 

 }

}