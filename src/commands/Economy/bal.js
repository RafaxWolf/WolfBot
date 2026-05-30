const economia = require('../../Schema/economia-schema')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "bal",
  alias: ["balance", "money"],

async execute (client, message, args){

  let user = message.mentions.users.first() || message.author //? Si no menciona a nadie, se toma a si mismo
  if(user === client.user) return message.channel.send("[-] No tienes permisos suficientes...") //? Si menciona al bot, no se muestra el balance
  
  let datos = await economia.findOne({ userID: user.id, guildID: message.guild.id }) //* Busca los datos del usuario mencionado o del mismo usuario
  if(!datos) { //! Si no tiene datos, se le crean
    message.author.send(`❌ | El usuario ${user} No esta registrado en la base de datos`)
    let datosnuevos = new economia({
      userID: user.id,
      guildID: message.guild.id,
      dinero: 0,
      dinerobanco: 0
    })

    await datosnuevos.save()
    if (user !== message.author) {
      return message.channel.send(`✅ | Los datos de ${user} están siendo guardados, vuelve a usar el comando.`)
    } else {
      return message.channel.send("✅ | Tus datos están siendo guardados, use otra vez el comando.")
    }

  } else {
    let dinerototal = datos.dinero
    let dinerobancototal = datos.dinerobanco

    const embed = new EmbedBuilder()
    .setTitle("Balance")
    .setThumbnail(user.displayAvatarURL())
    .setDescription(`WolfCoins de **${user}**`)
    .addFields(     //? Cartera, banco y total
      { name: "<:wolfcoin:935657063621726208> WolfCoins en la cartera:", value: `\`${parseInt(dinerototal).toLocaleString()}\``, inline: true },
      { name: "<:wolfcoin:935657063621726208> WolfCoins en el banco:", value: `\`${parseInt(dinerobancototal).toLocaleString()}\``, inline: true },
      { name: "<:wolfcoin:935657063621726208> WolfCoins totales:", value: `\`${parseInt(dinerototal + dinerobancototal).toLocaleString()}\``, inline: true }
      ////    { name: "ObjectId" , value: `${ObjectId}` }
    )
    .setColor("Green")
    .setTimestamp()
    
    const reply = await message.channel.send({ embeds: [embed] })
    setTimeout(() => {
      reply.delete().catch(console.error)
    }, 20000)
  }

 }

}