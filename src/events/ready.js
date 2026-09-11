const { ActivityType } = require("discord.js")
const { createVerificationMessage } = require("../functions/verificationHandler")
const { VERIFICATION_CHANNEL, TERMS_CHANNEL } = require("../config");

const getBasePath = require("../utils/getBasePath");
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")


module.exports = {
  name: 'clientReady',
  once: true,
  async execute(client) {

  //! Encendido del bot
  console.log(chalk.cyanBright(`\nLogged in as ${client.user.tag}.\n`));
  client.user.setPresence({ 
    activities: [
      { name: "w!help - /help", type: ActivityType.Playing }
    ], status: "dnd"
  })

  //* ==================== Sistema de Verificación ====================
  const filePath = path.join(getBasePath(), "events", "verification_message_id.json"); //* Ruta del archivo JSON donde se guarda el ID del mensaje de verificación
  const channel = client.channels.cache.get(VERIFICATION_CHANNEL)
  let data = {};

    try {
      if(!fs.existsSync(filePath)) {
        console.log(chalk.redBright("[!] ID del mensaje de verificacion no Encontrada!"))
        return createVerificationMessage(client, channel, TERMS_CHANNEL, filePath)
      }
      
      data = fs.readFileSync(filePath, 'utf-8')
      const { verificationMessageID } = JSON.parse(data)

      console.log(chalk.greenBright("[+] Archivo de verificación encontrado!\n"))

      if(!channel) {
        console.log(chalk.red("[!] No se pudo encontrar el canal de verificación!\n"))
      }

      //* Si existe el ID del mensaje de verificación, verifica si el mensaje sigue existiendo
      if(!verificationMessageID) {
        return createVerificationMessage(client, channel, TERMS_CHANNEL, filePath)
      }
      
      const existingMessage = await channel.messages.fetch(verificationMessageID) || null;
      
      //* Si el mensaje no existe, lo crea de nuevo y elimina el ID del mensaje anterior del archivo JSON
      if(!existingMessage) {
        console.log(chalk.redBright("[!] El embed de Verificación ya no existe o no se encuentra!\n"))
        
        fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: null })) //* Elimina el ID del embed anterior
        
        console.log(chalk.blueBright("[-] ID del embed anterior eliminado. enviando nuevo mensaje de verificación...\n"))

        return createVerificationMessage(client, channel, TERMS_CHANNEL, filePath)
      }

      console.log(chalk.greenBright("[+] El mensaje de verificación existe!\n"))

    //? Si ocurre un error al leer o escribir el archivo JSON, muestra el error
    } catch (err) {
      console.error(chalk.redBright("[!] Error al Leer/Escribir al archivo\n"), err)
    }
    
  }
}