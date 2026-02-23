const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ActivityType } = require("discord.js")
const getBasePath = require("../utils/getBasePath");
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")
const { VERIFICATION_CHANNEL } = require("../config")

module.exports = {
  name: 'clientReady',
  async execute(client) {


//* Sistema de Verificación

const filePath = path.join(getBasePath(), "events", "verification_message_id.json"); //* Ruta del archivo JSON donde se guarda el ID del mensaje de verificación

//? Función para crear y enviar el mensaje de verificación

/**
 * Creates, sends the verification message to the specified channel and register the message ID.
 * @param {*} channel Channel where the verification message will be sent.
 */
async function createVerificationMessage(channel) {

  // Crea el botón de verificación
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('verification')
      .setLabel("Verificarse")
      .setStyle(ButtonStyle.Primary)
    )

  // Crea el embed de verificación
  const verificationEmbed = new EmbedBuilder() //* Embed de verificación
    .setAuthor({ name: "The Hidden Wolf's", iconURL: "https://i.imgur.com/xTNwaQR.png" })
    .setTitle("Verificación")
    .setDescription("Para verificarte debes pulsar el botón de abajo.\nRecuerda leer las <#936741059642413107> del servidor.")
    .setColor("Blue")
    .setFooter({ text: "(Si no puedes verificarte abre un ticket con moderación para poder verificarte)", iconURL: client.user.displayAvatarURL() })
    
    // Envía el mensaje de verificación al canal
    const reply = await channel.send({ embeds: [verificationEmbed], components: [row] }) //* Envía el embed con el botón para poder verificarse
    const newVerificationMessageID = reply.id
    
    // Guarda el ID del nuevo mensaje de verificación en el archivo JSON
    console.log(chalk.greenBright("\n[+] Nuevo mensaje de verificación enviado y guardado!\n"))
    fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: newVerificationMessageID }))
  }

  // Lee el archivo JSON para obtener el ID del mensaje de verificación
  try {

    let data = {};

    if(fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, 'utf-8')
      console.log(chalk.greenBright("\n[+] Archivo de verificación encontrado!\n"))

    } else {
      fs.writeFileSync(filePath, JSON.stringify(data))
      console.log(chalk.blueBright("\n[+] Archivo de verificación creado!\n"))

    }

    //*----- Canal de verificación e ID del mensaje -----
    const channel = client.channels.cache.get(VERIFICATION_CHANNEL)
    const { verificationMessageID } = JSON.parse(data)
    //*--------------------------------------------------

    if(channel) {

      // Si existe el ID del mensaje de verificación, verifica si el mensaje sigue existiendo
      if(verificationMessageID) {
        try{
          const existingMessage = await channel.messages.fetch(verificationMessageID);

          // Si el mensaje existe, no hace nada
          if(existingMessage) {
            console.log(chalk.greenBright("[+] El mensaje de verificación existe!\n"))
            
          // Si el mensaje no existe, envía uno nuevo
          } else {
            console.log(chalk.redBright("[!] El embed de Verificación ya no existe o no se encuentra!\n"))
            fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: null })) //* Elimina el ID del embed anterior
            console.log(chalk.blueBright("[-] ID del embed anterior eliminado. enviando nuevo mensaje de verificación...\n"))
    
            createVerificationMessage(channel)
          }
        
        // Si ocurre un error, pero el error no es 10008 (mensaje no encontrado), muestra el error
        } catch (error) {
          if (!error.code === 10008) {
          console.log(chalk.redBright(`[!] Ha ocurrido un error:\n`), error)
          }
        }
    
      // Si no existe el mensaje de verificación, envía uno nuevo
      } else {
        createVerificationMessage(channel)
      }

    // Si no se encuentra el canal de verificación, muestra un error
    } else {
      console.log(chalk.red("[!] No se pudo encontrar el canal de verificación!\n"))
    }

  // Si ocurre un error al leer o escribir el archivo JSON, muestra el error
  } catch (err) {
    console.error(chalk.redBright("[!] Error al Leer/Escribir al archivo\n"), err)
  }

    //! Encendido del bot
    console.log(chalk.cyanBright(`Logged in as ${client.user.tag}.\n`));
    client.user.setPresence({ 
      activities: [
        { name: "w!help - /help", type: ActivityType.Playing }
      ], status: "dnd"
    });

    /* Deprecated
    //Votaciones y likes
    //const poll = require('../poll')
    //const likes = require('../likes')

    //poll(client)
    //likes(client)
    */
    
  },
};