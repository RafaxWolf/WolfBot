const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "dep",
  alias: ["depositar"],

async execute (client, message, args){

  let datos = await economia.findOne({ userID: message.author.id })
  if(!datos) {
    let nuevosdatos = new economia({
        userID: message.author.id,
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
    if(!cantidad) return message.reply("❌ | Debes poner una cantidad.")

    if(cantidad === 'all'){
        await economia.findOneAndUpdate({ userID: message.author.id }, {dinero: 0})
        await economia.findOneAndUpdate({ userID: message.author.id }, {dinerobanco: dinerobancototal + Number(dinerototal) })
        return message.channel.send("✅ | Has guardado todas tus <:wolfcoin:935657063621726208> WolfCoins en el banco.")
    }

    if(cantidad !== 'all'){
        if(isNaN(cantidad)) return message.author.send("❌ | Debes poner una cantidad valida!")
        if(cantidad < '1') return message.author.send("❌ | Deber poner un numero mas grnade que 0.")
        if(cantidad > dinerototal) return message.author.send("❌ | No puedes guardar mas <:wolfcoin:935657063621726208> WolfCoins de las que ya tienes!")
        
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - Number(cantidad) })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: dinerobancototal + Number(cantidad) })

        return message.channel.send(`✅ | Has guardado **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins en el banco.`)       
    }

 }

}