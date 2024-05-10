const path = require('node:path');
const economy = require('./Schema/economia-schema')
const levels = require('./Schema/xp-schema')
const pacmans = require('./pacmans')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Client, GatewayIntentBits, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const chalk = require("chalk");
const canalesExcluidos = require('./canalesExcluidos')

const cooldowns = new Map()

//! const util = require('util')
//! const wait = require('node:timers/promises').setTimeout;

//! const now = new Date(Date.now());

//! const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
//! const withPmAm = now.toLocaleTimeString('es-CL', {
//!  hour: '2-digit',
//!  minute: '2-digit',
//!});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
})
require("dotenv").config();
require('./conexion')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: false,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  leaveOnEmpty: true,
  searchSongs: 15,
  searchCooldown: 20,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

//* Command Handler
const commandHandler = require("./functions/commandsHandler")
const slashCommandHandler = require("./functions/slashCommandsHandler")

client.commands = commandHandler
client.slashCommands = slashCommandHandler

//-------------------------------------------------------------------------------------------
client.on("messageCreate", async (message) => {

  const logFileName = 'ConsoleLog.txt'

  const logFilePath = path.join(__dirname, logFileName);

  function consoleToRegistry() {
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' })
    
      console.log = (message) => {
        const logMessage = `${message}`
        logStream.write(logMessage)
        process.stdout.write(logMessage)
      }
    }

/*   function getCurrentTime() {
    const now = new Date();
    return `[${now.toISOString}]`
  } */
    try {
      consoleToRegistry()
    } catch (error) {
      console.log(chalk.redBright(`[!]`) + `Ha ocurrido un Error! \n` + (`${error}`))
    }


console.log(chalk.greenBright(`Server Name: [${message.guild.name}]\n`) + chalk.blueBright(`Server ID: ([${message.guild.id}])\n`) +
chalk.cyanBright(`Channel ID: (${message.channel.id})\n`) + chalk.redBright(`User Name: [${message.author.username}]\n`) +
(`User ID: (${message.author.id})\n`) + (`Message: ${message.content}\n`))

 var prefix = "w!"

  if(message.content.includes(":v")){
    ////message.author.send("[!] | Has incumplido una regla, pero no te preocupes solo tu mensaje sera eliminado por el bien mental del servidor.")
    message.delete()
  } else if(message.content.includes(":V")){
    message.delete()
  } else if(message.content.includes(":u")){
    message.delete()
  } else if(message.content.includes(":U")){
    message.delete()
  } else if(message.content.includes(":y")){
    message.delete()
  } else if(message.content.includes(":Y")){
    message.delete()
  } else if(message.content.includes(";v")){
    message.delete()
  } else if(message.content.includes(";V")){
    message.delete()
  } else if(message.content.includes(";u")){
    message.delete()
  } else if(message.content.includes(";U")){
    message.delete()
  } else if(message.content.includes(";y")){
    message.delete()
  } else if(message.content.includes(";Y")){
    message.delete()
  }

  // TODO: baneo de Pacmans

 if(message.content === prefix) return;

 if(message.author.bot) return;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  const Xpdata = await levels.findOne({ userID: message.author.id, guildID: message.guild.id }) //Datos

if(message.guild && message.guild.id === "338373170463506442"){
  console.log(chalk.bgRed("¡Access Denied!"))
  return;
} else {
  let randomXp
  if(message.content.length <= 5){
    randomXp = Math.floor(Math.random() * 3) + 1
  } else if(message.content.length >= 5 && message.content.length <= 30){
    randomXp = Math.floor(Math.random() * 20) + 1
  } else if(message.content.length >= 30 && message.content.length <= 50){
    randomXp = Math.floor(Math.random() * 45) + 1
  } else if(message.content.length >= 50 && message.content.length <= 70){
    randomXp = Math.floor(Math.random() * 60) + 1
  } else if(message.content.length >= 70 && message.content.length <= 80){
    randomXp = Math.floor(Math.random() * 70) + 1
  } else if(message.content.length > 80){
    randomXp = Math.floor(Math.random() * 75) + 1
  }
  console.log(chalk.blue(`randomXp: ${randomXp}\n`))

    if(!Xpdata){
      const newXpdata = new levels({
        guildID: message.guild.id,
        userID: message.author.id,
        xp: randomXp
      })
      return await newXpdata.save()
    }

    const xpTotal = Xpdata.xp + randomXp
    console.log(chalk.blueBright(`xpTotal: ${xpTotal}\n`))
    console.log(chalk.cyan(`Limite: ${Xpdata.limit}\n`))

      if(xpTotal >= Xpdata.limit){
      message.channel.send(`¡Felicidades ${message.author}, has ascendido a nivel **${Xpdata.level + 1}**!`)
     return levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: randomXp, level: Xpdata.level + 1, limit: Xpdata.limit + 500 })
    }

    await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: xpTotal })

    let currentlevel = Xpdata.level

    const thwguild = client.guilds.cache.get("852588155126677504")
    let rolId = thwguild.roles.cache.find(role => role.id === "1058095942835908770")

    if(currentlevel >= "20") {
      return message.channel.send(`🎉 | Felicidades ${message.author}, haz alcanzado el nivel **20** y por eso seras premiado con el rol ${rolId}`).then(message.author.roles.add("1058095942835908770"))
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const economyData = await economy.findOne({ userID: message.author.id, guildID: message.guild.id }) //Datos

      //Nueva entrada
        if(!economyData){
        let newEconomyData = new economy({
          userID: message.author.id,
          guildID: message.guild.id,
          dinero: randomXp
        })
      return await newEconomyData.save()
     }

     const pagoTotal = economyData.dinero + randomXp
     console.log(chalk.green(`pagoTotal: ${pagoTotal}\n\n`))
     //if(isNaN(pagoTotal)) return;
     await economy.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: pagoTotal })


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

 if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase())) {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
 
  //* Cooldown de los comandos normales
  const cooldownTime = 5
 
  if(!cooldowns.has(command)) {
   cooldowns.set(command, new Map());
  }
 
  const now = Date.now()
   const timestamps = cooldowns.get(command)
     const cooldownAmount = cooldownTime * 1000
 
  if(timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
 
   if(now < expirationTime) {
     message.delete()
     const leftTime = (expirationTime - now) / 1000
     return message.author.send(`Por favor, espera ${leftTime.toFixed(1)} segundos antes de poder usar el comando **\`w!${command}\`**`)
   }
  }
 
  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
 
 let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

  if(cmd){
      setTimeout(function(){
        message.delete()
      }, 750)
  
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.author.send("❌ | Debes estar en un canal de voz!")
    }

    try {
      cmd.execute(client, message, args)
    } catch (e) {
      console.log(e)
      message.channel.send(`[❌ | Error | ❌]\n\`${e}\``)
    }
   }

   if(!cmd) {
     const errorEmbed = new EmbedBuilder()
     .setTitle("❌ | Command Type Error")
     .setDescription(`El comando "**${command}**" no existe!`)
     .setTimestamp()
     .setColor("Red")
     .setFooter({ text: "(Para saber todos los comandos usa: w!help o /help)\n", iconURL: client.user.displayAvatarURL() })
 
     message.channel.send({ embeds: [errorEmbed] })
     message.delete()
   }
 
 }

})

//* Events Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if(event.name === 'interactionCreate') {
    client.on('interactionCreate', async (interaction) => {
      try {
        await event.execute(client, interaction)
      } catch (error) {
        console.error(error)
      }
    })
  } else if(event.name === 'guildCreate' || event.name === 'guildDelete') {
    client.on(event.name, async (guild) => {
      try{
        await event.execute(client, guild)
      } catch (error) {
        console.error(error)
      }
    })
  } else if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  
}

const status = (queue) => 
  //`Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Ninguno'}\` | Loop: \`${
  `Volumen: \`${queue.volume}%\` | Loop: \`${(queue.repeatMode === 1 ? 'Activado' : 'Desactivado')}\` | Autoplay: \`${queue.autoplay ? 'Activado' : 'Desactivado'}\``

client.distube
 .on('playSong', (queue, song) => {
   queue.textChannel.send(
    `**| ▶️ | Reproduciendo | ▶️ |** \n**\`${song.uploader.name}\`** \n*\`${song.name} - [${song.formattedDuration}]\`*\nSolicitada por: ${
      song.user
    }\n${status(queue)}`
)})  

.on('addSong', (queue, song) =>  
    queue.textChannel.send(
      `**| ☑️ | Añadido | ☑️ |** \n**\`${song.uploader.name}\`** \n*\`${song.name} - [${song.formattedDuration}]\`* \nSolicitada por: ${song.user}`
    )
)
.on('addList', (queue, playlist) => 
  queue.textChannel.send(
    `☑️ | Añadido \`${playlist.name}\` playlist\n (${
       playlist.songs.length
    } canciones) a la cola\n${status(queue)}`.slice(0, 10)
  )
)
.on('error', (channel, e) => {
  if (channel) channel.send(`❌ | Un error ha ocurrido: ${e.toString().slice(0, 1974)}`).then(console.error(e))
  else console.error(e)
})
.on('empty', message => message.channel.send("[!] El canal de voz actual esta vació\n\n Saliendo..."))
//.on('empty', interaction => interaction.reply({ content: "El canal de voz esa vació! Saliendo del canal..." }))
.on('searchNoResult', (message, query) =>
  message.channel.send(`❌ | No se ha encontrado un resultado para \`${query}\``)
)
//.on('searchNoResult', (interaction, query) =>
//  interaction.reply({ content: `❌ | No se ha encontrado un resultado para \`${query}\`` })
//)
.on("searchResult", (message, result) => {
  let i = 0
  embedNormalBuilder(client, message, "Yellow", "**Elige una de las opciones de abajo**", `${result.map(song => `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - *\`[${song.formattedDuration}]\`*`)
.join("\n")}\n*Elige cualquier opcion o espera 20 segundos para cancelar.*`)
})
//.on("searchResult", (interaction, result) => {
//  let i = 0
//  embedSlashBuilder(client, interaction, "Yellow", "**Elige una de las opciones de abajo**", `${result.map(song => `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - *\`[${song.formattedDuration}]\`*`)
//.join("\n")}\n*Elige cualquiera o espera 60 segundos para cancelar.*`)
//})
//  message.channel.send(
//    `**Elige una de las opciones de abajo**\n${result
//    .map(song => `**${++i}**. **\`${song.uploader.name}\`** | ${song.name} - \`${song.formattedDuration}\``)
//    .join("\n")}\n*Ingresa cualquiera o espera 60 segundos para cancelar*`
//  )

.on("searchCancel", message => message.channel.send("❌ | Búsqueda cancelada"))
//.on("searchCancel", interaction => interaction.reply({ content: "❌ | Búsqueda cancelada"}))
.on("searchInvalidAnswer", message => {
    return message.channel.send(
    `❌ | Respuesta Invalida, Búsqueda cancelada!`
  )
})
//.on("searchInvalidAnswer", interaction => {
//    return interaction.reply({
//    content: `❌ | Respuesta Invalida, Búsqueda cancelada!`
//  })
//})
.on("searchDone", () => {})

//Embeds
function embedNormalBuilder(client, message, color, title, description){

  let embed = new EmbedBuilder()
  .setColor(color)
  .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
  if(title) embed.setTitle(title)
  if(description) embed.setDescription(description)
  return message.channel.send({ embeds: [embed] })

}

/*function embedSlashBuilder(client, interaction, color, title, description){

  let embed = new EmbedBuilder()
  .setColor(color)
  .setFooter({ text: `${interaction.author.username}`, iconURL: `${interaction.author.displayAvatarURL()}` })
  if(title) embed.setTitle(title)
  if(description) embed.setDescription(description)
  return interaction.reply({ embeds: [embed] })

}*/

//! Token in .env
client.login(process.env.TOKEN);