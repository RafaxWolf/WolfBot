const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "slots",
  alias: ["tragamonedas", "tragaperras"],

async execute (client, message, args){
  
let datos = await economia.findOne({ userID: message.author.id })
  if(!datos) {
    let nuevosdatos = new economia({
        userID: message.author.id,
        dinero: 0,
        dinerobanco: 0
    })
    await nuevosdatos.save()
    return message.channel.send("Tus datos están siendo guardados, use otra vez el comando.")
    }

    let dineronuestro = datos.dinero
    //let probabilidad = Math.floor(Math.random() * 200) + 1
    let randomMoney = Math.floor(Math.random() * 200) + 100

    // TODO: Hacer mejor los Slots

    const emojis = {
      '1': ':mouse:',
      '2': ':strawberry:',
      '3': ':cherries:',
      '4': ':sunglasses:',
      '5': ':seven:',
    }

    let randomNumbers = ''
    let lastResult = ''

    for(let i = 0; i < 5; i++){
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      randomNumbers += randomNumber.toString()
    }

    let resultWithEmojis = ''

    for(const num of randomNumbers) {
      resultWithEmojis += emojis[num]
    }
    const sentMessage = await message.channel.send(`Resultado: ${resultWithEmojis}`)

    const allEqual = randomNumbers.split('').every((val, i, arr) => val === arr[0])

    const delay = 1000
    for(let i = 0; i < 2; i++){
      await new Promise((resolve) => setTimeout(resolve, delay))
      randomNumbers = ''
      for(let j = 0; j < 5; j++){
        const randomNumber = Math.floor(Math.random() * 5) + 1
        randomNumbers += randomNumber.toString()
      }

      resultWithEmojis = ''
      for(const num of randomNumbers) {
        resultWithEmojis += emojis[num]
      }

      await sentMessage.edit(`Resultado: ${resultWithEmojis}`)

      if(i === 1) {
        lastResult = resultWithEmojis
      }
    }

    //message.author.send(`El último resultado fue: ${lastResult}`)

    if(allEqual){
      await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro + Number(randomMoney) })
      message.channel.send(`**${message.author}** Ha ganado **${randomMoney}** <:wolfcoin:935657063621726208> WolfCoins`)
    } else {
      await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro - Number(randomMoney) })
      message.channel.send(`**${message.author}** Ha perdido **${randomMoney}** <:wolfcoin:935657063621726208> WolfCoins`)
    }

    //var Fail = [":seven: :mouse: :strawberry:", ":seven: :seven: :cherries:", ":seven: :cherries: :strawberry:", ":sunglasses: :strawberry: :mouse:"]
    //var Win = [":mouse: :mouse: :mouse:", ":strawberry: :strawberry: :strawberry:", ":cherries: :cherries: :cherries:", " :sunglasses: :sunglasses:", ":seven: :seven: :seven:"]

    //var SlotFail = Math.floor(Math.random()*(Fail.length));
    //var SlotWin = Math.floor(Math.random()*(Win.length));

    if(dineronuestro < '200') return message.author.send(`No tienes suficientes <:wolfcoin:935657063621726208> WolfCoins!`)

    //if(probabilidad < 100){
        //message.channel.send(Fail[SlotFail])
        //await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro - Number(random) })
        //message.channel.send(`**${message.author}** Ha perdido **${random}** <:wolfcoin:935657063621726208> WolfCoins`)
    //}
    //if(probabilidad > 100){
        //message.channel.send(Win[SlotWin])
        //await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: dineronuestro + Number(random) })
        //message.channel.send(`**${message.author}** Ha ganado **${random}** <:wolfcoin:935657063621726208> WolfCoins`)
    //}

 }

}