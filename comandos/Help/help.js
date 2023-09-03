const { EmbedBuilder } = require("discord.js")


module.exports = {
  name: "help",
  alias: ["ayuda", "?"],

async execute (client, message, args){

    const messages = await message.channel.messages.fetch({ limit: 2 })

    if(!args[0]) {
      const helpEmbed = new EmbedBuilder()
        .setTitle("**Lista de Ayuda**")
        .addFields(
          { name: "\u200B", value: "\u200B" },
          { name: "Ayuda del sistema de economia", value: "**\`w!help economy (or w!help money)\`**", inline: true },
          { name: "Ayuda del sistema de hackeo", value: "**\`w!help hacking\`**", inline: true },
          { name: "Ayuda de las recompensas de los niveles de patreon", value: "**\`w!help patreon\`**", inline: true },
          { name: "Ayuda del casino", value: "**\`w!help casino\`**", inline: true },
          { name: "Ayuda del sistema de musica", value: "**\`w!help music\`**", inline: true },
          { name: "Ayuda del sistema de experiencia", value: "**\`w!help experience (or w!help xp)\`**", inline: true },
        )
        .setTimestamp()

        message.channel.send({ embeds: [helpEmbed] })
    }
    /*`
    **Lista de Ayuda:**
    \n**w!help economy**\n\`Ayuda del sistema de economia\`
    \n**w!help hacking**\n\`Ayuda del sistema de hackeo\`
    \n**w!help patreon**\n\`Ayuda de las recompensas de los niveles de patreon\`
    \n**w!help casino**\n\`Ayuda del casino\`
    \n**w!help music**\n\`Ayuda del sistema de musica\`
    \n**w!help xp**\n\`Ayuda del sistema de experiencia\`
    `*/
    switch (args[0]) {
      case 'economy':
        messages.forEach(msg => {
          if(msg.author.id === client.user.id) {
            msg.delete();
          }
        });

        const economy = new EmbedBuilder()
        .setTitle("Economia")
        .setColor("White")
        .addFields(
          { name: "\u200B", value: "\u200B" },
          { name: "Balance", value: "w!bal", inline: true },
          { name: "Trabajar", value: "w!work", inline: true },
          { name: "Depositar", value: "w!dep", inline: true },
          { name: "Retirar", value: "w!with", inline: true },
          { name: "Pagar", value: "w!pay", inline: true },
          { name: "Transferir", value: "w!transfer", inline: true },
          { name: "Robar", value: "w!rob", inline: true },
          { name: "Tienda", value: "w!shop", inline: true },
          { name: "Tabla de posiciones", value: "w!economyleaderboard", inline: true },
        )
        .setTimestamp()

        message.channel.send({ embeds: [economy] })/*`
      Comandos:\n
      w!bal\n
      w!work\n
      w!dep\n
      w!with\n
      w!shop\n
      w!leaderboard\n
      w!rob\n
      w!pay\n
      w!addmoney \`(**Solo para ADMINS!**)\`
        `*/
        break
      case 'hacking':
        message.channel.send(`
        das
        `)
        break
      case 'patreon':
        message.channel.send(`
        sad
        `)
        break
      case 'casino':
        message.channel.send(`
        dsa
        `)
        break
      case 'music':
      /*helper.edit(`
        Comandos:
        w!join
        w!play (or p) | (can resume stopped song's)
        w!leave
        w!queue
        w!loop
        w!pause (or stop)
        w!nowplaying (or np)
        w!skip
        w!autoplay
        w!volume (or v)
      `)*/
        break
      case 'experience', 'xp':
        message.channel.send(`
        asd
        `)
        break
    }        
        
      
 }

}