const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "with",
  alias: ["withdraw", "retirar"],

  async execute (client, message, args){

    let datos = await economia.findOne({ userID: message.author.id })
    if(!datos) {
      let nuevosdatos = new economia({
          userID: user.id,
          guildID: message.guild.id,
          dinero: 0,
          dinerobanco: 0
      })
      await nuevosdatos.save()
      return message.channel.send("🔁 | Tus datos están siendo guardados, use otra vez el comando.")
      }
  
      let dinerototal = datos.dinero
      let dinerobancototal = datos.dinerobanco

      var cantidad = args[0]
      if(!cantidad) return message.author.send("❌ | Debes poner una cantidad.").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!with <numero o all> (all es para sacar todo el dinero que tengas en el banco)"))

      if(cantidad === 'all'){
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: 0 })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(dinerobancototal) })

        return message.channel.send(`✅ | Has sacado **${dinerobancototal}** WolfCoins del banco.`)
      }

      if(cantidad !== 'all'){
          if(isNaN(cantidad)) return message.author.send("❌ | Debes poner una cantidad valida!").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!with <numero o all> (all para sacar todo el dinero del banco)"))
          if(cantidad < '1') return message.author.send("❌ | La cantidad debe ser mayor que 0!").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!with <numero o all> (all para sacar todo el dinero del banco)"))
          if(cantidad > dinerobancototal) return message.author.send("❌ | No puedes sacar una cantidad de WolfCoins mayor a la que tienes en el banco!").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!with <numero o all> (all es para sacar todo el dinero que tengas en el banco)"))
          
          await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: dinerobancototal - Number(cantidad) })
          await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(cantidad) })

          return message.channel.send(`✅ | ${message.author} Has sacado **${cantidad}** WolfCoins del banco.`)
      }
 }

}