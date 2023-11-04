const Discord = require('discord.js');
const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "slots",
  alias: ["tragamonedas"],

async execute (client, message, args){
  
let datos = await economia.findOne({ userID: message.author.id })
  if(!datos) {
    let nuevosdatos = new economia({
        userID: message.author.id,
        dinero: 0,
        dinerobanco: 0
    })
    await nuevosdatos.save()
    return message.reply("Tus datos están siendo guardados, use otra vez el comando.")
    }

    let dineronuestro = datos.dinero
    let probabilidad = Math.floor(Math.random() * 200) + 1
    let random = Math.floor(Math.random() * 200) + 100

    var Fail = [":seven: :mouse: :strawberry:", ":seven: :seven: :cherries:", ":seven: :cherries: :strawberry:", ":sunglasses: :strawberry: :mouse:", "5F"]
    var Win = [":mouse: :mouse: :mouse:", ":strawberry: :strawberry: :strawberry:", ":cherries: :cherries: :cherries:", ":sunglasses: :sunglasses: :sunglasses:", ":seven: :seven: :seven:"]

    var SlotFail = Math.floor(Math.random()*(Fail.length));
    var SlotWin = Math.floor(Math.random()*(Win.length));

    if(dineronuestro < '200') return message.channel.send(`${message.author} No tienes el suficientes <:wolfcoin:935657063621726208> WolfCoins!`)

    if(probabilidad < 100){
        message.channel.send(Fail[SlotFail])
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro - Number(random) })
        message.channel.send(`**${message.author.username}** Ha perdido **${random}** <:wolfcoin:935657063621726208> WolfCoins`)
    }
    if(probabilidad > 100){
        message.channel.send(Win[SlotWin])
        await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro + Number(random) })
        message.channel.send(`**${message.author.username}** Ha ganado **${random}** <:wolfcoin:935657063621726208> WolfCoins`)
    }

 }

}