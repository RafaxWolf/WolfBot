const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "rob",
  alias: [""],

async execute (client, message, args){

  let user = message.mentions.users.first()
    if(!user) return message.channel.send("Debes mencionar a un usuario!")

  let datos = await economia.findOne({ userID: message.author.id })
    if(!datos) {
      message.author.send("❌** | System error | **❌\n¡No estas registrado en la base de datos!\n*Abra un ticket para recibir ayuda de algún administrador*")
    }

    let datos2 = await economia.findOne({ userID: user.id })
    if(!datos2){
        const peo = new economia({
            userID: user.id,
            dinero: 0,
            dinerobanco: 0
        })
        await peo.save()
        return message.author.send(`Los datos de ${user} están siendo guardados, asi que no tiene dinero que puedas robar.`)
    }

    let dineronuestro = datos.dinero
    let dinerosuyo = datos2.dinero
    let dinerorobar = Math.floor(Math.random() * dinerosuyo) + 1
    let probabilidad = Math.floor(Math.random() * 200) + 1

    if(dinerosuyo === '0') return message.author.send(`**${user}** no tiene WolfCoins fuera del banco!`)
    if(user === message.author.id) return message.author.send("No puedes robarte a ti mismo!")
    if(user.id === "765454346061086770") return message.author.send(`${message.author} No puedes robarme!`)
    if(user.id === "769609763188506655") return message.author.send(`${message.author} No puedes robar a ${user}!`)
    if(user.id === "594359919004614670") return message.author.send(`${message.author} No puedes robar a ${user}!`)

    if(probabilidad < 100){
        message.channel.send(`${message.author} Ha intentado robar a **${user}** y no ha podido.`)
    }
    if(probabilidad > 100){
        await economia.findOneAndUpdate({ userID: user.id }, { dinero: dinerosuyo - Number(dinerorobar) })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro + Number(dinerorobar) })
        return message.channel.send(`${message.author} Ha robado **${dinerorobar}** WolfCoins a **${user}**`)
    }

 }

}