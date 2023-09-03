const economia = require('../../Schema/economia-schema')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "economyleaderboard",
  alias: ["economylb", "elb", "economyLeaderBoard", "eLB", "economyLb", "economyLB", "eLeaderboard", "eLeaderBoard"],

async execute (client, message, args){

let dataGlobal = await economia.find({ guildID: message.guild.id }).sort([["dinero", "descending"]]).exec();
  dataGlobal = dataGlobal.slice(0, 10);
    if(!dataGlobal) return message.channel.send("❌ | Nadie tiene dinero en este servidor!")

    const puestoUsuario = dataGlobal.findIndex(dataUser => dataUser.userID === message.author.id) + 1

    const embed = new EmbedBuilder()
    .setTitle("Leaderboard")
    .setDescription(`${dataGlobal
      .map((data, index) => 
      `${index === 0 ? "🥇" : index + 1 ? "🥈" : index + 1 ? "🥉" : index + 1}. ${client.users.cache.get(data.userID)}\n\`${data.dinero + data.dinerobanco} Dinero en total\``)
      .join("\n")}`)
    .setColor("Aqua")
    .setFooter({ text: `Te encuentras en el puesto: ${puestoUsuario}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()

    message.channel.send({ embeds: [embed] })

 }

}
