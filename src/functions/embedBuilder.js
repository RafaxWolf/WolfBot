const { EmbedBuilder } = require("discord.js")

/**
 * Crea el Embed que se utilizara de forma normal en los comandos.
 * @param {*} client Cliente del bot | null.
 * @param {*} message Mensaje donde se enviará el embed.
 * @param {*} color Color del embed.
 * @param {*} title Titulo del embed.
 * @param {*} description Contenido/Descripción del embed.
 * @returns Envia el embed al canal donde esta el mensaje.
 */
function embedNormalBuilder(client, message, color, title, description) {
    let embed = new EmbedBuilder()
    .setColor(color)
    .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
    if(title) embed.setTitle(title)
    if(description) embed.setDescription(description)
    return message.channel.send({ embeds: [embed] })
}

module.exports = { embedNormalBuilder }