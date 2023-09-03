const Discord = require('discord.js');
const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "rob",
  alias: [""],

async execute (client, message, args){

  let user = message.mentions.users.first()
    if(!user) return message.channel.send("Debes mencionar a un usuario!")

  let datos = await economia.findOne({ userID: message.author.id })
    if(!datos) {
      message.author.send("❌** | System error | **❌\n¡No estas registrado en la base de datos!\n*Abra un ticket para recibir ayuda de algun administrador*")
    }

    let datos2 = await economia.findOne({ userID: user.id })
    if(!datos2){
        const peo = new economia({
            userID: user.id,
            dinero: 0,
            dinerobanco: 0
        })
        await peo.save()
        return message.channel.send(`Los datos de ${user} estan siendo guardados, vuelve a usar el comando.`)
    }

    let dineronuestro = datos.dinero
    let dinerosuyo = datos2.dinero
    let dinerorobar = Math.floor(Math.random() * dinerosuyo) + 1
    let probabilidad = Math.floor(Math.random() * 200) + 1

    if(dinerosuyo === '0') return message.reply(`**${user.username}** no tiene WolfCoins fuera del banco!`)
    if(user === message.author.id) return message.reply("No puedes robarte a ti mismo!")
    if(user.id === "765454346061086770") return message.channel.send(`${message.author} No puedes robarme!`)
    if(user.id === "769609763188506655") return message.channel.send(`${message.author} No puedes robar a ${user}!`)
    if(user.id === "594359919004614670") return message.channel.send(`${message.author} No puedes robar a ${user}!`)

    if(probabilidad < 100){
        message.channel.send(`${message.author} Ha intentado robar a **${user.username}** y le ha salido mal`)
    }
    if(probabilidad > 100){
        await economia.findOneAndUpdate({ userID: user.id }, { dinero: dinerosuyo - Number(dinerorobar) })
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro + Number(dinerorobar) })
        return message.channel.send(`Has robado a **${dinerorobar}** WolfCoins a **${user.username}**`)
    }

 }

}