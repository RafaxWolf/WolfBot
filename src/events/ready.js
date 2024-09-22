const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ActivityType } = require("discord.js")
const fs = require("fs")
const chalk = require("chalk")

module.exports = {
  name: 'ready',
  async execute(client) {

//Sistema de Verificación

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

    //Encendido del bot
    console.log(chalk.cyanBright(`Logged in as ${client.user.tag}.\n`));
    client.user.setPresence({ activities: [{ name: "w!help - /help", type: ActivityType.Playing }], status: "dnd"});

    //Votaciones y likes
    const poll = require('../poll')
    const likes = require('../likes')

    poll(client)
    likes(client)
    
  },
};