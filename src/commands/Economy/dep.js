const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "dep",
  alias: ["depositar"],

async execute (client, message, args){

  // Obtiene los datos de la Database
  let datos = await economia.findOne({ userID: message.author.id })
  if(!datos) { //* Si no existen los datos en la Database crea nuevos datos.
    let nuevosdatos = new economia({
        userID: message.author.id,
        guildID: message.guild.id,
        dinero: 0,
        dinerobanco: 0
    })
    await nuevosdatos.save() //! Guarda los datos nuevos en la Database
    return message.author.send("🔁 | Tus datos están siendo guardados, use otra vez el comando.")
    }

    //* Obtiene los totales de dinero del usuario
    let dinerototal = datos.dinero //? Cartera
    let dinerobancototal = datos.dinerobanco //? Banco
    
    var cantidad = args[0] //? La cantidad de dinero a guardar en el Banco
    if(!cantidad) return message.author.send("❌ | Debes poner una cantidad.").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!dep <numero o all> (all es para almacenar todo el dinero de tu cartera al banco)"))

    if(cantidad === 'all'){ //* Guardar todo el dinero en el Banco
        await economia.findOneAndUpdate({ userID: message.author.id }, {dinero: 0})
        await economia.findOneAndUpdate({ userID: message.author.id }, {dinerobanco: dinerobancototal + Number(dinerototal) })
        return message.channel.send("✅ | Has guardado todas tus <:wolfcoin:935657063621726208> WolfCoins en el banco.")
    }

    if(cantidad === 'todo'){ //* Guardar todo el dinero en el Banco
      await economia.findOneAndUpdate({ userID: message.author.id }, {dinero: 0})
      await economia.findOneAndUpdate({ userID: message.author.id }, {dinerobanco: dinerobancototal + Number(dinerototal) })
      return message.channel.send("✅ | Has guardado todas tus <:wolfcoin:935657063621726208> WolfCoins en el banco.")
  }

    if(cantidad !== 'all'){
        if(isNaN(cantidad)) return message.author.send("❌ | Debes poner una cantidad valida!").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!dep <numero o all> (all es para almacenar todo el dinero de tu cartera al banco)"))
        if(cantidad < '1') return message.author.send("❌ | Necesitas poner una cantidad mayor que 0!.").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!dep <numero o all> (all es para almacenar todo el dinero de tu cartera al banco)"))
        if(cantidad > dinerototal) return message.author.send("❌ | No puedes guardar mas <:wolfcoin:935657063621726208> WolfCoins de las que ya tienes!").then(message.author.send("❌ | Syntax Error | ❌\nUso correcto del comando:\nw!dep <numero o all> (all es para almacenar todo el dinero de tu cartera al banco)"))
        
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dinerototal - Number(cantidad) })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinerobanco: dinerobancototal + Number(cantidad) })

        return message.channel.send(`✅ | ${message.author} Ha guardado **${cantidad}** <:wolfcoin:935657063621726208> WolfCoins en el banco.`)       
    }

 }

}