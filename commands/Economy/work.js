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

      var companys = [ "Blume", "NASA", "Galilei", "Instagram", "Twitch", "Twitter", "Google", "Reddit", "Github", "Kick", "Ubisoft", "Square Enix", "Electronic Arts", "Mojang", "Discord", "Microsoft"]

      var vulnerabilities = [ "Path Traversal", "SQL Injection", "Buffer Overflow", "Code Injection", "EternalBlue", "BlueKeep", "Log Poisoning"]

      const vulnerabilitiesrandom = vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)]

      const companyrandom = companys[Math.floor(Math.random() * companys.length)]

      const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
      .setTitle("Auditoria")
      .setColor("Green")
      //.setDescription(`**${message.author.username}**`)
      .addFields(
        { name: "Vulnero a la compañía", value: `**${companyrandom}**`, inline: true },
        { name: "Y como recompensa recibió", value: `**${random}** <:wolfcoin:935657063621726208> **WolfCoins** como recompensa`, inline: true },
        { name: "Usando la vulnerabilidad", value: `**${vulnerabilitiesrandom}**` }
      )
      .setTimestamp()

      message.channel.send({ embeds: [embed] })

 }

}