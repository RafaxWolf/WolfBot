//* JavaScript
const fs = require('fs');
const path = require('node:path');
const chalk = require("chalk");

//* Discord.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

//* Schemas
const economy = require('./Schema/economia-schema')
const levels = require('./Schema/xp-schema')

//* Configuración del Client del Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

//* Configuración de Distube
require('./functions/musicHandler')(client) //* Archivo de las funciones de musica (Distube)

const { TOKEN } = require('./config') //! Token del bot
require('./conexion') //* Conexion a la base de datos

// TODO: 
//const vacRole = "862051677720936448" //Rol de VAC Baneado

//* Functions
const commandHandler = require("./functions/commandsHandler") //* Archivo de las funciones de los Prefix Commands
const slashCommandHandler = require("./functions/slashCommandsHandler"); //* Archivo de las funciones de los Slash Commands
const { match } = require('minimatch');

client.commands = commandHandler //* Handler de los Prefix Commands
client.slashCommands = slashCommandHandler //* Handler de los Slash Commands

//-----------------------------------------Prefix Commands-----------------------------------------

client.on("messageCreate", async (message) => {

  var prefix = "w!" //! Prefix del Bot 
 
  //TODO: Comandos de Creador
  var authPrefix = "wAuth!" //! Prefix para comandos de creador

//!------------------------------------------------------------------Log de la Consola------------------------------------------------------------------

  console.log(chalk.greenBright(`Server Name: [${message.guild.name}]\n`) + //? Muestra el nombre del servidor
  chalk.blueBright(`Server ID: ([${message.guild.id}])\n`) + //? Muestra el ID del servidor
  chalk.cyanBright(`Channel ID: (${message.channel.id})\n`) + //? Muestra el ID del canal
  chalk.redBright(`User Name: [${message.author.username}]\n`) + //? Muestra el nombre del usuario
  (`User ID: (${message.author.id})\n`) + (`Message: ${message.content}\n`)) //? Muestra el ID del usuario y el mensaje enviado

//!-----------------------------------------------------------------------------------------------------------------------------------------------------

 if(message.content === prefix) return; //! Verifica si el mensaje es solo el prefix, si es asi no hace nada

 if(message.author.bot) return; //! Verifica si el autor del mensaje es un Bot, si es asi no hace nada

//?------------------------------------------------------------------Sistema de Experiencia---------------------------------------------------------------------------------------

  const Xpdata = await levels.findOne({ userID: message.author.id, guildID: message.guild.id }) //* Encuentra los datos de la EXP del usuario

  if(message.guild && message.guild.id === "338373170463506442" || message.guild && message.guild.id === "1351577010400395325"){  //! Verifica si el mensaje fue enviado a uno de los servidores prohibidos.
    console.log(chalk.red("¡Access Denied!")) //! Si el mensaje fue enviado a uno de los servidores prohibidos, Regresa un mensaje de "¡Access Denied!"
    return;

  //* Si el mensaje fue enviado a un servidor permitido, continua con el proceso de ganar EXP
  } else {
    //? Calcula la EXP ganada por el mensaje enviado dependiendo de la longitud del mensaje

    let randomXp
    switch (true) {
      case message.content.length <= 5:
        randomXp = Math.floor(Math.random() * 3) + 1
        break;

      case message.content.length >= 5 && message.content.length <= 30:
        randomXp = Math.floor(Math.random() * 20) + 1
        break;

      case message.content.length >= 30 && message.content.length <= 50:
        randomXp = Math.floor(Math.random() * 45) + 1
        break;

      case message.content.length >= 50 && message.content.length <= 70:
        randomXp = Math.floor(Math.random() * 60) + 1
        break;

      case message.content.length >= 70 && message.content.length <= 80:
        randomXp = Math.floor(Math.random() * 70) + 1
        break;

      case message.content.length > 80:
        randomXp = Math.floor(Math.random() * 75) + 1
        break;
    }

    console.log(chalk.blue(`randomXp: ${randomXp}`)) //* Muestra la EXP ganada

    //? Nueva entrada en la Base de Datos si no existe
    if(!Xpdata){
      const newXpdata = new levels({
        guildID: message.guild.id,
        userID: message.author.id,
        xp: randomXp
      })
      return await newXpdata.save() //! Guarda en la Base de Datos la nueva entrada
    }

    const xpTotal = Xpdata.xp + randomXp //* Suma la cantidad de EXP actual con la cantidad de EXP ganada
    console.log(chalk.blueBright(`xpTotal: ${xpTotal}`)) //* Muestra la EXP total del usuario
    console.log(chalk.cyan(`Limite: ${Xpdata.limit}`)) //* Muestra el limite de EXP para subir de nivel

    if(xpTotal >= Xpdata.limit){ //* Comprueba si la EXP total es mayor o igual al limite de EXP
      message.channel.send(`¡Felicidades ${message.author}, has ascendido de nivel!\nTu nuevo nivel sera: **${Xpdata.level + 1}**`) //* Mensaje de que el usuario ha ascendido de nivel
      return levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: randomXp, level: Xpdata.level + 1, limit: Xpdata.limit + 500 }) //* Aumenta el nivel, el limite de EXP y resetea los puntos de EXP a 0
    }

    await levels.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { xp: xpTotal }) //* Actualiza la EXP total del usuario

    let currentlevel = Xpdata.level //* Nivel actual del usuario

    const thwguild = client.guilds.cache.get("852588155126677504") //* Comprueba de que el servidor sea el oficial
    let rolId = thwguild.roles.cache.find(role => role.id === "1058095942835908770") //* ID del rol a otorgar.

    //* Si el nivel actual del usuario es igual o mayor a 20 y el servidor donde se enviaron los mensajes es TheHiddenWolf, otorga el rol.
    if(currentlevel >= "20" && message.guild.id === "852588155126677504") {
      return message.channel.send(`🎉 | Felicidades ${message.author}, haz alcanzado el nivel **20** y por eso seras premiado con el rol ${rolId}`).then(message.author.roles.add("1058095942835908770"))
    }

//*-------------------------------------------------------------------------------Sistema de economia-------------------------------------------------------------------------------

    const economyData = await economy.findOne({ userID: message.author.id, guildID: message.guild.id }) //* Encuentra los datos de la economia del usuario
      //? Nueva entrada en la Base de Datos si no existe
        if(!economyData){
        let newEconomyData = new economy({
          userID: message.author.id,
          guildID: message.guild.id,
          dinero: randomXp,
          dinerobanco: 0
        })
      return await newEconomyData.save() //! Guarda en la Base de Datos la nueva entrada
     }

     const pagoTotal = economyData.dinero + randomXp //* Suma la cantidad de dinero actual con la cantidad de dinero ganada
     console.log(chalk.green(`pagoTotal: ${pagoTotal}\n\n`)) // Muestra en consola el total del dinero ganado
     ////if(isNaN(pagoTotal)) return;
     await economy.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { dinero: pagoTotal }) //* Actualiza la cantidad de dinero del usuario en la Base de Datos
  }
//*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase())) { //* Verifica si el mensaje empieza con el prefix

    //* Detecta los argumentos del mensaje (prefix!command <args[0]/args[1]/args[2]...>)
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 

    //* Detecta si el mensaje empieza con el prefix para interpretarlo como un comando
    const command = args.shift().toLowerCase()
    
    //? Cooldown de los comandos
    require('./functions/cooldownHandler')(client, message, command) //* Archivo de las funciones de cooldown de los comandos
  
    //* Detector Prefix Commands
    let cmd = client.commands.find(
      (c) => c.name === command || c.alias && c.alias.includes(command)
    );

    //* Después de ejecutar el comando, elimina el mensaje del autor
    if(cmd){
        setTimeout(() => {
          message.delete()
        }, 850)
      
        /*
          Verificadores / Validadores
          en los comandos
        */

        //* Verifica si el comando necesita estar en un canal de voz
        if (cmd.inVoiceChannel && !message.member.voice.channel) {
          return message.author.send("❌ | Para usar este comando debes estar en un canal de voz!")
        }

        //* Verifica si el comando solo esta disponible para moderadores
        if (cmd.modOnly && !message.member.permissions.has("ManageMessages")) {
          return message.author.send("❌ | No tienes permisos para usar este comando!")
        }

        //* Verifica si el comando solo esta disponible para el desarrollador
        if (cmd.authOnly && !message.author.id === "594359919004614670") {
          return message.author.send("❌ | No tienes permisos para usar este comando!")
        }

        //* Ejecución del comando
        try {
          cmd.execute(client, message, args)
        } catch (e) {
          //! Si ocurre un error, lo muestra en consola y envía un mensaje de error al canal
          console.error(e)
          message.channel.send(`[❌ | Error | ❌]\n\`${e}\``)
        }
    } else {
      //! Si el comando no existe, envía un mensaje de error al canal
      const errorEmbed = new EmbedBuilder()
      .setTitle("❌ | Command Type Error")
      .setDescription(`El comando "**${command}**" no existe!`)
      .setTimestamp()
      .setColor("Red")
      .setFooter({ text: "(Para saber todos los comandos usa: w!help o /help)\n", iconURL: client.user.displayAvatarURL() })
  
      message.channel.send({ embeds: [errorEmbed] }) //* Envía el Embed de error al canal
      message.delete() //* Elimina el mensaje del comando
    }
  }

  // TODO: Comandos de Creador / Auth Commands
  if(message.content.startsWith(authPrefix) && message.author.id === "594359919004614670" || message.content.startsWith(authPrefix.toUpperCase()) && message.author.id === "594359919004614670") { //* Verifica si el mensaje empieza con el prefix
  
    if(message.content === authPrefix) return; //! Verifica si el mensaje es solo el prefix, si es asi no hace nada
    if(message.author.bot) return; //! Verifica si el autor del mensaje es un Bot, si es asi no hace nada
  
  } else {
    if(message.content.startsWith(authPrefix) && message.author.id !== "594359919004614670" || message.content.startsWith(authPrefix.toUpperCase()) && message.author.id !== "594359919004614670") { //* Verifica si el mensaje empieza con el prefix
      const noAuth = message.channel.send("❌ | ¡No tienes permisos suficientes para utilizar este comando!")

      setTimeout(async () => {
        await noAuth.delete().catch(console.error)
      }, 3000);
    }
  }
});

//* Events Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  const eventHandler = async (...args) => {
    try {
      await event.execute(client, ...args);
    } catch (err) {
      console.error(err);
    }
  };

  //? Registra el evento como "once" o "on" según su configuración
  if (event.once) {
    client.once(event.name, eventHandler);
  } else {
    client.on(event.name, eventHandler);
  }
}

//! Token in .env file
client.login(TOKEN);