const Discord = require('discord.js');
const economia = require('../../Schema/economia-schema')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "work",
  alias: ["trabajar"],

async execute (client, message, args){

  let datos = await economia.findOne({ userID: message.author.id })
  if(!datos){
      let datosnuevos = new economia({
          userID: message.author.id,
          guildID: message.guild.id,
          dinero: 0,
          dinerobanco: 0
      })
      await datosnuevos.save()
      return message.channel.send("Tus datos están siendo guardados, use otra vez el comando.")
  }

  let dinerototal = datos.dinero

  let random = Math.floor(Math.random() * 325) + 150

  await economia.findOneAndUpdate({ userID: message.author.id }, {dinero: dinerototal + Number(random) })

  var companys = ["ctOS", "NASA", "Galilei", "Instagram", "Twitch", "Twitter", "Youtube"]

  const companyrandom = companys[Math.floor(Math.random() * companys.length)]

  const embed = new EmbedBuilder()
  .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
  .setTitle("Trabajo")
  .setColor("GREEN")
  .setDescription(`**${message.author.username}**`)
  .addField("Hackeo a", `**${companyrandom}**`, true)
  .addField("Y gano", `**${random}** <:wolfcoin:935657063621726208> WolfCoins`)
  .setTimestamp()

  message.channel.send({ embeds: [embed] })

 }

}