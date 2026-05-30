const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "help",
  alias: ["ayuda", "?"],

async execute (client, message, args){

    const messages = await message.channel.messages.fetch({ limit: 2 })

    if(!args[0]) {
      const helpEmbed = new EmbedBuilder()
        .setTitle("**Lista de Ayuda**")
        .setDescription("Para obtener ayuda de un sistema en específico, usa el comando de la siguiente manera: **\`w!help (sistema)\`**")
        .setColor("White")
        .addFields(
          { name: "Ayuda del sistema de economia", value: "**\`w!help economy (or w!help money)\`**", inline: true },
          { name: "Ayuda del sistema de música", value: "**\`w!help music\`**", inline: true },
          //{ name: "Ayuda de las recompensas de los niveles de Patreon", value: "**\`w!help Patreon\`**", inline: true },
          //{ name: "Ayuda del sistema de experiencia", value: "**\`w!help experience (or w!help xp)\`**", inline: true },
          //{ name: "Ayuda del sistema de Hackeo", value: "**\`w!help hacking\`**", inline: true },
          //{ name: "Ayuda del casino", value: "**\`w!help casino\`**", inline: true },
        )
        .setTimestamp()

        message.channel.send({ embeds: [helpEmbed] })
    }

    switch (args[0]) {
      case 'economy', 'money':
        const economy = new EmbedBuilder()
        .setTitle("Economia")
        .setColor("Green")
        .setDescription("**Lista de comandos del sistema de economia**")
        .addFields(
          { name: "Balance", value: "\`w!bal\`", inline: true },
          { name: "Trabajar", value: "\`w!work\`", inline: true },
          { name: "Depositar", value: "\`w!dep\`", inline: true },
          { name: "Retirar", value: "\`w!with\`", inline: true },
          { name: "Pagar", value: "\`w!pay\`", inline: true },
          { name: "Transferir", value: "\`w!transfer\`", inline: true },
          { name: "Robar", value: "\`w!rob\`", inline: true },
          { name: "Tienda", value: "\`w!shop\`", inline: true },
          { name: "Tabla de posiciones", value: "\`w!economyleaderboard\`", inline: true },
        )
        .setTimestamp()

        message.channel.send({ embeds: [economy] })
        break;

      case 'hacking':
        message.channel.send(`
        das
        `)
        break;

      case 'patreon':
        message.channel.send(`
        sad
        `)
        break;

      case 'casino':
        message.channel.send(`
        dsa
        `)
        break;

      case 'music':
        const music = new EmbedBuilder()
        .setTitle("Música")
        .setColor("Red")
        .setDescription("**Lista de comandos del sistema de música**")
        .addFields(
          { name: "Unir", value: "w!join <Channel ID> (Optional)", inline: true },
          { name: "Salir", value: "w!leave", inline: true },
          { name: "Reproducir", value: "w!play <Song name or URL> / w!p <Song name or URL>", inline: true },
          { name: "Reanudar", value: "w!pause (If is already paused it will resume the song) / w!play (Without anything it will resume the song)", inline: true },
          { name: "Añadir", value: "w!add <Song name or URL>", inline: true },
          { name: "Pausar", value: "w!pause / w!stop", inline: true },
          { name: "Anterior", value: "w!previous", inline: true },
          { name: "Siguiente/Saltar", value: "w!skip", inline: true },
          { name: "Volver a reproducir", value: "w!replay", inline: true },
          { name: "Letra", value: "w!lyrics <genius/default> <Song name> (Optional)", inline: true },
          { name: "Cola", value: "w!queue", inline: true },
          { name: "Loop", value: "w!loop <song/queue/off>", inline: true },
          { name: "Sonando Ahora", value: "w!nowplaying / w!np", inline: true },
          { name: "Volumen", value: "w!volume <Number>", inline: true },
          { name: "Auto-Reproducción", value: "w!autoplay", inline: true },
        )

        message.channel.send({ embeds: [music] })
        break;

      case 'experience', 'xp':
        
      break;
    }        
        
      
 }

}