const { AttachmentBuilder } = require("discord.js")
const levels = require('../../Schema/xp-schema')
const { Rank } = require("canvacord")

module.exports = {
  name: "rank",
  alias: ["nivel"],

async execute (client, message, args){

  let user = message.mentions.users.first() || message.author

  const data = await levels.findOne({ guildID: message.guild.id, userID: user.id })
  if(!data) return message.author.send(`❌ || El usuario ${user} no tiene ningun progreso en el servidor`)

  let dataGlobal = await levels.find({ guildID: message.guild.id }).sort([["xp", "descending"]]).exec()

  if(!dataGlobal) return message.author.send("❌ || Nadie en el servidor tiene algun progreso")

  dataGlobal = dataGlobal
  const rankCard = new Rank()
  .setAvatar(user.displayAvatarURL({ size: 2048, format: "png" }))
  .setCurrentXP(data.xp)
  .setRequiredXP(data.limit)
  .setLevel(data.level)
  .setStatus(user.presence ? author.presence.status : "offline")
  .setProgressBar("#0D6E00", "COLOR")
  .setUsername(user.username)
  .setDiscriminator(user.discriminator)
  .setRank(dataGlobal.findIndex(dataUser => dataUser.userID === user.id) + 1)

  const buffer = await rankCard.build()

  const attachment = new AttachmentBuilder(buffer, "rank.png")

  message.channel.send({ files: [attachment] })

 }

}