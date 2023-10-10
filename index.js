const Discord = require("discord.js");
const path = require('node:path');
const economy = require('./Schema/economia-schema')
const levels = require('./Schema/xp-schema')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const wait = require('node:timers/promises').setTimeout;

//const now = new Date(Date.now());

//const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
//const withPmAm = now.toLocaleTimeString('es-CL', {
//  hour: '2-digit',
//  minute: '2-digit',
//});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})
require("dotenv").config();
require('./conexion')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  leaveOnEmpty: true,
  searchSongs: 10,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

//Command Handler
client.commands = new Discord.Collection();
let carpetas = fs.readdirSync('./comandos/').map((subCarpetas) => {
  const archivos = fs.readdirSync(`./comandos/${subCarpetas}`).map((comandos) => {
    let comando = require(`./comandos/${subCarpetas}/${comandos}`)
    client.commands.set(comando.name, comando)
  })
});

client.on("messageCreate", async (message) => {
console.log(`Server Name: [${message.guild.name}]\nServer ID: ([${message.guild.id}])\n\n${message.content}\n `)

 let prefix = "w!"

  if(message.content.startsWith("wolfbot") && message.content.endsWith("test")){
    message.author.send("asd")
  }

 if(message.content === prefix) return;

 if(message.author.bot) return;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  const Xpdata = await levels.findOne({ userID: message.author.id, guildID: message.guild.id }) //Datos

if(message.guild && message.guild.id === "338373170463506442"){
  console.log("¡Access Denied!")
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
  console.log(`randomXp: ${randomXp}`)

    if(!Xpdata){
      const newXpdata = new levels({
        guildID: message.guild.id,
        userID: message.author.id,
        xp: randomXp
      })
      return await newXpdata.save()
    }

    const xpTotal = Xpdata.xp + randomXp
    console.log(`xpTotal: ${xpTotal}`)
    console.log(`Limite: ${Xpdata.limit}`)

      if(xpTotal >= Xpdata.limit && !Xpdata.level === "20"){
      message.channel.send(`¡Felicidades ${message.author}, has acendido a nivel **${Xpdata.level + 1}**!`)
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
     console.log(`pagoTotal: ${pagoTotal}\n\n`)
     //if(isNaN(pagoTotal)) return;
     await economy.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: pagoTotal })


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

 if(!message.content.startsWith(prefix)) return;

 const args = message.content.slice(prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase()

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
    setTimeout(function(){
      message.delete()
    }, 750)
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send("Debes estar en un canal de voz!")
    }
    try {
      cmd.execute(client, message, args)
      } catch (e) {
        console.log(e)
        message.channel.send(`:x: | Error | :x:\n\`${e}\``)
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
  }

 })

//Slash Commands Handler
client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith("js"))

  for(const file of slashcommandsFiles){
    const slash = require(`./slashcmd/${file}`)
    console.log(`Slash Commands - ${file} cargado.`)
    client.slashcommands.set(slash.data.name, slash)
  }

//Events Handler
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

//  setInterval(() => {
//  var general = client.channels.cache.find(channel => channel.id === '1001992290174242877');
//  general.send("")
//  }, 60000)

//verificacion para entrar al server
//client.on("messageCreate", message => {
//  if(message.channel.id === "927605760152707172"){
//      if(message.author.bot) return;

//      if(message.content === "Acepto"){
//          message.member.roles.add("862054591323570186").then(message.member.roles.add("937229695966117888"));
//          message.author.send("Gracias por verificarte\nPara que no te banen lee las normas");
//          message.delete();
//      }
//      else{
//          message.author.send("Para verificarte tienes que poner el mensaje **Acepto**\nSi tienes problemas habla con un Admin");
//          message.delete();
//      }
//    }
//});

//Distube CMD'S
//let guild = client.guilds.cache.get("852588155126677504")

//setInterval(() => {
//  let asd = client.channels.cache.get("991746789034184725")
//  var asdf = ['ASD', 'FGH', 'JKL', 'Ñ & Q', 'WER', 'TYU', 'IOP']
//  var randomASD = Math.floor(Math.random()*(asdf.length))
//  asd.send(asdf[randomASD])
//}, 10000)

const status = (queue) => 
  `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Ninguno'}\` | Loop: \`${
    (queue.repeatMode === 1 ? 'Activado' : 'Desactivado')
  }\` | Autoplay: \`${queue.autoplay ? 'Activado' : 'Desactivado'}\``

client.distube
 .on('playSong', (queue, song) => {
/*   if(song && song.name && bannedSongsName.includes(song.name)) {
    distube.stop(message)
    const voiceChannel = message.member.voice.channel
    if(voiceChannel) {
      voiceChannel.leave();
    }
    message.reply("❌ | Esta Cancion/Video ha sido baneada del sistema de musica!")

  }  */
   queue.textChannel.send(
    `**| ▶️ | Reproduciendo | ▶️ |**\n **\`${song.uploader.name}\`**\n*\`${song.name}\`* - \`[${song.formattedDuration}]\`\nSolicitado por: ${
      song.user
    }\n${status(queue)}`
)})  

.on('addSong', (queue, song) => 
    queue.textChannel.send(
      `**| ☑️ | Añadido | ☑️ |**\n **\`${song.uploader.name}\`**\n*\`${song.name}\`* - \`[${song.formattedDuration}]\`\nSolicitada por: ${song.user}`
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
.on('empty', message => message.channel.send("El canal de voz esa vacio! Saliendo del canal..."))
//.on('empty', interaction => interaction.reply({ content: "El canal de voz esa vacio! Saliendo del canal..." }))
.on('searchNoResult', (message, query) =>
  message.channel.send(`❌ | No se ha encontrado un resultado para \`${query}\``)
)
//.on('searchNoResult', (interaction, query) =>
//  interaction.reply({ content: `❌ | No se ha encontrado un resultado para \`${query}\`` })
//)
.on("searchResult", (message, result) => {
  let i = 0
  embedNormalBuilder(client, message, "Yellow", "**Elige una de las opciones de abajo**", `${result.map(song => `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - *\`[${song.formattedDuration}]\`*`)
.join("\n")}\n*Elige cualquiera o espera 60 segundos para cancelar.*`)
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

.on("searchCancel", message => message.channel.send("❌ | Busqueda cancelada"))
//.on("searchCancel", interaction => interaction.reply({ content: "❌ | Busqueda cancelada"}))
.on("searchInvalidAnswer", message => {
    return message.channel.send(
    `❌ | Respuesta Invalida, Busqueda cancelada!`
  )
})
//.on("searchInvalidAnswer", interaction => {
//    return interaction.reply({
//    content: `❌ | Respuesta Invalida, Busqueda cancelada!`
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

//Token in .env
client.login(process.env.TOKEN);