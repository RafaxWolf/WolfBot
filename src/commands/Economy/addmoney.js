const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "addmoney",
  alias: ["añadir-dinero"],

async execute (client, message, args){

  const user = message.mentions.users.first() || message.author

  const cantidad = Number(args[1])

  let syntaxError = "❌ | Syntax Error | ❌\nUso correcto del comando:\nw!addmoney <@usuario> <cantidad>"

  if(!cantidad) return message.author.send(syntaxError)
  if(isNaN(cantidad)) return message.author.send(syntaxError)
  
  async function addmoney(user, guild) {
    let datos = await economia.findOne({ userID: user, guildID: guild })
    if(!datos) {
      let nuevosdatos = new economia({
          guildID: guild,
          userID: user,
          dinero: 0,
          dinerobanco: 0
      })
      await nuevosdatos.save()
      return message.reply(`Los datos de ${user} están siendo guardados, use otra vez el comando.`)
      
    } else {
      await economia.findOneAndUpdate({ userID: user, guildID: guild }, { dinerobanco: datos.dinerobanco + cantidad })
    }
  }

  addmoney(user.id, message.guild.id)
  message.channel.send(`✅ | Se han añadido **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins a **${user}**`) 

 }

}