const Discord = require('discord.js');
const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "with",
  alias: [""],

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
      return message.reply("Tus datos están siendo guardados, use otra vez el comando.")
      }
  
      let dinerototal = datos.dinero
      let dinerobancototal = datos.dinerobanco

      var cantidad = args[0]
      if(!cantidad) return message.reply("Debes poner una cantidad.")

      if(cantidad === 'all'){
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: 0 })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(dinerobancototal) })

        return message.reply(`Has sacado **${dinerobancototal}** WolfCoins del banco.`)
      }

      if(cantidad !== 'all'){
          if(isNaN(cantidad)) return message.reply("Debes poner una cantidad valida!")
          if(cantidad < '1') return message.reply("La cantidad debe ser mayor que 0!")
          if(cantidad > dinerobancototal) return message.reply("No puedes sacar una cantidad de WolfCoins mayor a la que tienes en el banco!")
          
          await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: dinerobancototal - Number(cantidad) })
          await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal + Number(cantidad) })

          return message.channel.send(`${message.author} Has sacado **${cantidad}** WolfCoins del banco.`).then(msg => msg.delete({timeout: 5000}));
      }
 }

}