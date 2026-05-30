const { EmbedBuilder } = require("discord.js")

/**
 * Crea el Embed que se utilizara de forma normal en los comandos.
 * @param {any | null} client Cliente del bot | null.
 * @param {*} message Mensaje donde se enviará el embed.
 * @param {string} color Color del embed.
 * @param {string} title Titulo del embed.
 * @param {string} description Contenido/Descripción del embed.
 * @param {boolean} showFooter Crear/Mostar un Footer en el Embed
 * @returns Envia el embed al canal donde esta el mensaje.
 */
function normalEmbedBuilder(client, message, {
    color = "White",
    title = "Example",
    description = "No desc Provided",
    showFooter = false
}) {
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    if(showFooter) {
        embed.setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
    }
        
        
    return embed;
}

/**
 * 
 * @param {any | null} client Cliente del bot.
 * @param {*} queue Cola de reproducción actual.
 * @param {*} song Cancion actual / por reproducir.
 * @param {object} param3 Opciones personalizadas.
 * @returns Embed personalizado para los eventos de musica (play, add, etc).
 */
function musicEmbedBuilder(client, queue, song, {
    color = "White",
    text = "Title",
    showProgress = false
} ) {
    const status = (queue) => 
    ////`Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Ninguno'}\` | Loop: \`${
    `Volumen: \`${queue.volume}%\` | Loop: \`${(queue.repeatMode === 1 ? 'Activado' : 'Desactivado')}\` | Autoplay: \`${queue.autoplay ? 'Activado' : 'Desactivado'}\``

    const embed = new EmbedBuilder()
    .setColor(color)
    .setAuthor({ name: text, iconURL: `https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png` })
    .setThumbnail(song.thumbnail)
    .setTitle(song.title)
    .setURL(song.url)
    .setFooter({ text: `Solicitada por: ${song.username}`, iconURL: song.username.displayAvatarURL()})
    if(showProgress){
        embed.setDescription(`*\`[${song.formattedCurrentTime}]\`* / *\`[${song.duration}]\`* | **\`${song.uploader.name}\`**\n${status(queue)}`)
    } else {
        embed.setDescription(`Duración: **\`${song.duration}\`**\nAutor: **\`${song.uploader.name}\`**`)
    }

    return embed;
}

module.exports = { normalEmbedBuilder, musicEmbedBuilder }