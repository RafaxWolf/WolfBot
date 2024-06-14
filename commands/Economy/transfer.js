const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "transfer",
  alias: ["transferir"],

async execute (client, message, args){

    let user = message.mentions.users.first()
    if(!user) return message.channel.send("⚠ | Debes mencionar a un usuario!")

  let datosnuestros = await economia.findOne({ userID: message.author.id })
  if(!datosnuestros) {
      let datosnuestrosnuevos = new economia({
        userID: user.id,
        guildID: message.guild.id,
        dinero: 0,
        dinerobanco: 0
      })
      await datosnuestrosnuevos.save()
      return message.channel.send("✅ | Tus datos están siendo guardados, use otra vez el comando.")
  }

  let datos2 = await economia.findOne({ userID: user.id })
  if(!datos2){
      const peo = new economia({
          userID: user.id,
          dinero: 0,
          dinerobanco: 0
      })
      await peo.save()
      return message.channel.send(`✅ | Los datos de ${user} estan siendo guardados, vuelve a usar el comando.`)
  }

  let dinerototal = datosnuestros.dinerobanco
  let dinerosuyo = datos2.dinerobanco

  let cantidad = Number(args[1])
  if(!cantidad) return message.channel.send("❌ | Debes escribir una cantidad!")
  if(isNaN(cantidad)) return message.channel.send("❌ | Usa una cantidad valida!")
  if(dinerototal < cantidad) return message.channel.send("❌ | No puedes pagarle mas <:wolfcoin:935657063621726208> WolfCoins de las que tienes!")
  if(cantidad < '1') return message.channel.send("❌ | La cantidad debe ser mayor a 0!")

  await economia.findOneAndUpdate({ userID: message.author.id }, {dinero: dinerototal - cantidad})
  await economia.findOneAndUpdate({ userID: user.id }, { dinero: dinerosuyo + cantidad })

  return message.channel.send(`✅ | Le has depositado **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins a **${user}** exitosamente`)

 }

}