//*---------------------------------------------Necessary---------------------------------------------

//* JavaScript
const fs = require('fs');
const path = require('node:path');
const chalk = require("chalk");

//* Discord.js
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');

//* Distube
const { DisTube } = require('distube')
const { YtDlpPlugin } = require("@distube/yt-dlp")
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')

//*---------------------------------------------Necessary---------------------------------------------

//* Schemas
const economy = require('./Schema/economia-schema')
const levels = require('./Schema/xp-schema')

//* Random
const pacmans = require('./pacmans')
const canalesExcluidos = require('./canalesExcluidos')

const cooldowns = new Map()

//* Configuración del Client del Bot
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

//* Configuración de Distube

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: false,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  leaveOnEmpty: true,
  searchSongs: 15,
  searchCooldown: 20,
  emptyCooldown: 25,
  nsfw: true,
  savePreviousSongs: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: false }),
  ]
})

//* Functions
const commandHandler = require("./functions/commandsHandler")
const slashCommandHandler = require("./functions/slashCommandsHandler");

client.commands = commandHandler
client.slashCommands = slashCommandHandler

//-----------------------------------------Prefix Commands-----------------------------------------

client.on("messageCreate", async (message) => {

 var prefix = "w!"

//!---------------------------------Log de la Consola---------------------------------

  console.log(chalk.greenBright(`Server Name: [${message.guild.name}]\n`) +
   chalk.blueBright(`Server ID: ([${message.guild.id}])\n`) +
    chalk.cyanBright(`Channel ID: (${message.channel.id})\n`) +
     chalk.redBright(`User Name: [${message.author.username}]\n`) +
      (`User ID: (${message.author.id})\n`) + (`Message: ${message.content}\n`))

//!-----------------------------------------------------------------------------------

  //TODO: baneo de Pacmans

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

  //Lo termino en 80 años mas

 if(message.content === prefix) return;

 if(message.author.bot) return;

//?------------------------------------------------------------------Sistema de Experiencia---------------------------------------------------------------------------------------
  const Xpdata = await levels.findOne({ userID: message.author.id, guildID: message.guild.id }) // Datos de la Database

if(message.guild && message.guild.id === "338373170463506442"){  //!Verifica si no es uno de los servidores prohibidos.
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

  console.log(chalk.blue(`randomXp: ${randomXp}`)) // Muestra la EXP ganada

    if(!Xpdata){
      const newXpdata = new levels({
        guildID: message.guild.id,
        userID: message.author.id,
        xp: randomXp
      })
      return await newXpdata.save() //! Si no hay una entrada del usuario en la Database, crea una nueva
    }

    const xpTotal = Xpdata.xp + randomXp
    console.log(chalk.blueBright(`xpTotal: ${xpTotal}`))
    console.log(chalk.cyan(`Limite: ${Xpdata.limit}`))

      if(xpTotal >= Xpdata.limit){
      message.channel.send(`¡Felicidades ${message.author}, has ascendido de nivel!\nTu nuevo nivel sera: **${Xpdata.level + 1}**`)
     return levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: randomXp, level: Xpdata.level + 1, limit: Xpdata.limit + 500 })
    }

    await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: xpTotal })

    let currentlevel = Xpdata.level

    const thwguild = client.guilds.cache.get("852588155126677504")
    let rolId = thwguild.roles.cache.find(role => role.id === "1058095942835908770")

    if(currentlevel >= "20" && message.guild.id === "852588155126677504") {
      return message.channel.send(`🎉 | Felicidades ${message.author}, haz alcanzado el nivel **20** y por eso seras premiado con el rol ${rolId}`).then(message.author.roles.add("1058095942835908770"))
    }

//?---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//*-------------------------------------------------------------------------------Sistema de economia-------------------------------------------------------------------------------

    const economyData = await economy.findOne({ userID: message.author.id, guildID: message.guild.id })

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


//*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

 if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase())) {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
 
  //* Cooldown de los Prefix Commands
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
 
//* Detecta los Prefix Commands
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
      console.error(e)
      message.channel.send(`[❌ | Error | ❌]\n\`${e}\``)
    }
   } else {
    
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
    queue.voice.setSelfDeaf(false);
    queue.textChannel.send(
      `**| ▶️ | Reproduciendo | ▶️ |** \n**\`${song.uploader.name}\`** \n*\`${song.name} - [${song.formattedDuration}]\`*\nSolicitada por: ${
      song.user
      }\n${status(queue)}`
    );
    try {
      console.log(`[+] Cambiando presencia a: Escuchando a ${song.name} / ${song.uploader.name}`);
      client.user.setPresence({ activities: [{ name: `${song.name} / ${song.uploader.name}`, type: ActivityType.Listening }], status: "dnd" })
    } catch (error) {
      console.error(error)
    }

  }
)

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
.on('empty', (message) => {
  const empty = message.channel.send("[!] El canal de voz actual esta vació!\n\nSaliendo...")

    setTimeout(() => {
      empty.delete().catch(console.error)
    }, 2000)

  }
)

//* Search
.on('searchNoResult', (message, query) =>
  message.channel.send(`❌ | No se ha encontrado un resultado para \`${query}\``)
)
.on("searchResult", async(message, result) => {
  let i = 0
  const search = await embedNormalBuilder(client, message, "Yellow", "**Elige una de las opciones de abajo**", `${result.map(song => `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - *\`[${song.formattedDuration}]\`*`)
.join("\n")}\n*Elige cualquier opcion o espera 20 segundos para cancelar.*`)

  setTimeout(() => {
    search.delete().catch(console.error)
  }, 20000)
})
.on("searchCancel", async(message) => {
  message.channel.send("❌ | Búsqueda cancelada")
})
.on("searchInvalidAnswer", async(message) => {
  message.channel.send(`❌ | Respuesta Invalida, Búsqueda cancelada!`)
})
.on("searchDone", () => {
  //message.delete()
})

//* Finish
.on("finish", (queue) => { //* CUando todas las canciones de la lista hayan pasado vuelve a la presencia normal
  client.user.setPresence({ activities: [{ name: "w!help - /help", type: ActivityType.Playing }], status: "dnd"});
  console.log("\nEnded!")
})
.on("disconnect", (queue) => { //* CUando el Bot se desconecta del VC, vuelve a poner su Presencia normal
  client.user.setPresence({ activities: [{ name: "w!help - /help", type: ActivityType.Playing }], status: "dnd"});
})
.on("ffmpegDebug", console.log)

//Embeds
function embedNormalBuilder(client, message, color, title, description){

  let embed = new EmbedBuilder()
  .setColor(color)
  .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
  if(title) embed.setTitle(title)
  if(description) embed.setDescription(description)
  return message.channel.send({ embeds: [embed] })

}

//! Token in .env file
client.login(process.env.TOKEN);