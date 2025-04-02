const economia = require('../../Schema/economia-schema')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "bal",
  alias: ["balance", "money"],

async execute (client, message, args){

  let user = message.mentions.users.first() || message.author

  if(user === client.user) return message.channel.send("[!] No tienes permisos suficientes...")
  let datos = await economia.findOne({ userID: user.id, guildID: message.guild.id })

    if(!datos) {
      message.author.send(`❌ | El usuario ${user} No esta registrado en la base de datos`)

      let datosnuevos = new economia({
        userID: message.author.id,
        guildID: message.guild.id,
        dinero: 0,
        dinerobanco: 0
      })
      await datosnuevos.save()
      return;
    }

  let dinerototal = datos.dinero
  let dinerobancototal = datos.dinerobanco
  ////let ObjectId = datos.id

  const embed = new EmbedBuilder()
  .setTitle("Balance")
  .setThumbnail(user.displayAvatarURL())
  .setDescription(`WolfCoins de **${user}**`)
  .addFields(
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