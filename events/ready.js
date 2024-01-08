////const moment = require('moment');
////const format = require("moment")
////const tz = require('moment-timezone')
////require("dotenv").config();

////const { CHANNEL_ID, TIMEZONE, FORMAT, UPDATE_INTERVAL } = process.env;

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const fs = require("fs")
const chalk = require("chalk")

module.exports = {
  name: 'ready',
  async execute(client) {

// TODO: Sistema de Verificación

const channelID = '1063533274233852005';
const filePath = "./events/verification_message_id.json";

try {
  
  let data = {};
  if(fs.existsSync(filePath)) {
    data = fs.readFileSync(filePath, 'utf-8')
  } else {
    fs.writeFileSync(filePath, JSON.stringify(data))
  }

  const { verificationMessageID } = JSON.parse(data)

  const channel = client.channels.cache.get(channelID)

  if(channel) {
    if(verificationMessageID) {
      try{
        const existingMessage = await channel.messages.fetch(verificationMessageID);

        if(existingMessage) {
          console.log(chalk.greenBright("\n[+] El mensaje sigue existiendo! [+]"))
        }
      } catch (error) {
        if(error.code === 10008) {
          console.log(chalk.redBright("[!] El mensaje ya no existe o no se encuentra! [!]"))

          fs.writeFileSync(filePath, JSON.stringify({}))
          console.log(chalk.blueBright("[-] ID del mensaje anterior eliminado. enviando nuevo mensaje de verificación... [-]"))
  
          const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setCustomId('verification')
            .setLabel("Verificarse")
            .setStyle(ButtonStyle.Primary)
          )

          const verificationEmbed = new EmbedBuilder() //* Embed de verificación
          .setAuthor({ name: "The Hidden Wolf's", iconURL: "https://i.imgur.com/xTNwaQR.png" })
          .setTitle("Verificación")
          .setDescription("Para verificarte debes pulsar el botón de abajo.\nRecuerda leer las <#936741059642413107> del servidor.")
          .setColor("Blue")
          .setFooter({ text: "(Si no puedes verificarte abre un ticket con moderación para poder verificarte)", iconURL: client.user.displayAvatarURL() })
  
          const reply = await channel.send({ embeds: [verificationEmbed], components: [row] }) //* Envía el embed con el botón para poder verificarse
          const newVerificationMessageID = reply.id
  
          fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: newVerificationMessageID })) 
        } else {
          console.log(chalk.redBright(`[!] Ha ocurrido un error [!]\n`), error)
        }
      }
    }
  }

  if(channel) {
    if(!verificationMessageID) {
      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId('verification')
        .setLabel("Verificarse")
        .setStyle(ButtonStyle.Primary)
      )
        const verificationEmbed = new EmbedBuilder()
        .setAuthor({ name: "The Hidden Wolf's", iconURL: "https://i.imgur.com/xTNwaQR.png" })
        .setTitle("Verificación")
        .setDescription("Para verificarte debes pulsar el botón de abajo.\nRecuerda leer las <#936741059642413107> del servidor.")
        .setColor("Blue")
        .setFooter({ text: "(Si no puedes verificarte abre un ticket con moderación para poder verificarte)", iconURL: client.user.displayAvatarURL() })

        const reply = await channel.send({ embeds: [verificationEmbed], components: [row] })
        const newVerificationMessageID = reply.id

        fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: newVerificationMessageID }))
    } else {
      console.log(chalk.greenBright("\n[+] El mensaje de verificación ya existe! [+]\n"))
    }
  } else {
    console.log(chalk.red("[-] No se pudo encontrar el canal de verificación! [-]"))
  }
} catch (err) {
  console.log(chalk.bgRed("[!] Error al Leer/Escribir al archivo [!]\n"), err)
}

    ////const timeNow = moment().tz(TIMEZONE).format(FORMAT);
/*   setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT)
    const clockChannel = client.channels.cache.get("1078813186737840209")

    if(clockChannel) {
      clockChannel.setName(`🕒 ${timeNowUpdate}`)
        .then(updated => console.log(`Reloj actualizado: ${updated.name}`))
        .catch(console.error);
    } else {
      console.log('[!] Canal de voz/texto no encontrado!')
    }
  }, UPDATE_INTERVAL) */
/*       clockChannel.edit({ name: `🕒 ${timeNowUpdate}`}, 'Clock update')
          .catch(console.error)
  }, UPDATE_INTERVAL) */
/*
    const thwClockChannel = client.channels.cache.get(CHANNEL_THW)

      thwClockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
        .catch(console.error)

      setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT)
      thwClockChannel.edit({ name: `🕒 ${timeNowUpdate}`}, 'Clock update')
          .catch(console.error)
}, UPDATE_INTERVAL) */

//    memberCountChannel.edit({ name: `👥 ${memberCount}` }, 'Member count')
//      .catch(console.error)

//    setInterval(() => {
//    const newMemberCount = guild.members.cache.filter(member => !member.user.bot).size;
//    memberCountChannel.edit({ name: `👥 ${newMemberCount}` }, 'Member count')
//      .catch(console.error)
//}, 10000)

    console.log(`Logged in as ${client.user.tag}.\n`);
    client.user.setPresence({ activities: [{ name: "w!help - /help" }], status: "dnd"});

    const poll = require('../poll')
    const likes = require('../likes')

    poll(client)
    likes(client)
  },
};