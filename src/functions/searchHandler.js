const { embedNormalBuilder } = require("./embedBuilder")

async function searchResult (client, message, results) {
    let i = 0
    const content = results.map(song =>
        `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - \`[${song.formattedDuration}]\``
    ).join("\n");
    const search = embedNormalBuilder(client, message, "Yellow", "**Elige una de las opciones de abajo.**", content)

    setTimeout(() => {
        search.delete().catch(console.error)
    }, 20000)
    return search
}

async function searchCancel(message) {
    return embedNormalBuilder(null, message, "Red", null, "❌ | Búsqueda cancelada (no se recibió respuesta).")
}

async function searchInvalidAnswer(message) {
    return embedNormalBuilder(null, message, "Red", null, "❌ | Respuesta inválida. Búsqueda cancelada.")
}

module.exports = {
    searchResult,
    searchCancel,
    searchInvalidAnswer
}