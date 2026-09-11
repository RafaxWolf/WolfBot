const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { verificationEmbedBuilder } = require("./embedBuilder")
const chalk = require("chalk")
const fs = require("fs")

// Crea el botón de verificación
const row = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('verification')
    .setLabel("Verificarse")
    .setStyle(ButtonStyle.Primary)
)

/**
 * Crea y envía un mensaje de verificación al canal especificado. Este mensaje contiene un embed con información sobre la verificación y un botón que los usuarios pueden presionar para verificarse.
 * El ID del mensaje de verificación se guarda en un archivo JSON para futuras referencias.
 * @param {*} channel Canal de verificacion
 * @param {*} termsChannel Canal de los Terminos / Reglas
 */
async function createVerificationMessage(client, channel, termsChannel, filePath) {

    const verificationEmbed = verificationEmbedBuilder(client, termsChannel, {})

    // Envía el mensaje de verificación al canal
    const reply = await channel.send({ embeds: [verificationEmbed], components: [row] }) //* Envía el embed con el botón para poder verificarse
    const newMessageId = reply.id
    
    // Guarda el ID del nuevo mensaje de verificación en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify({ verificationMessageID: newMessageId }, null, 2))
    console.log(chalk.greenBright("[+] Nuevo mensaje de verificación enviado y guardado!\n"))
}

module.exports = { createVerificationMessage }