const fs = require("fs")
const getBasePath = require("../utils/getBasePath")

// Discord.js
const { ActivityType } = require("discord.js")

// Distube
const { DisTube } = require("distube");
const { YouTubePlugin } = require("@distube/youtube");
const { DirectLinkPlugin } = require("@distube/direct-link");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

// Embeds
const { normalEmbedBuilder, musicEmbedBuilder } = require("./embedBuilder")

module.exports = (client) => {
    const distube = new DisTube(client, {
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        savePreviousSongs: true,
        nsfw: true,
        plugins: [
            new YouTubePlugin({ cookies: JSON.parse(fs.readFileSync(getBasePath() + "/cookies.json")) }),
            new DirectLinkPlugin(),
            new SpotifyPlugin(),
            new SoundCloudPlugin()
        ]
    })
    client.distube = distube

    client.distube
    .on("playSong", (queue, song) => {
        queue.voice.setSelfDeaf(false)
        const playEmbed = musicEmbedBuilder(client, queue, song, { color: "Red", text: "Reproduciendo ahora", showProgress: true })
        try {
            queue.textChannel.send({ embeds: [playEmbed] }) //* Envia el embed al canal de texto donde se esta reproduciendo la canción
            
            //* Muestra en consola que el Bot esta escuchando a la canción
            console.log(`[+] Cambiando presencia a: Escuchando a ${song.name} / ${song.uploader.name}`); 
        
            //* Cambia la presencia del Bot a "Escuchando a <Nombre de la Canción> / <Nombre del Uploader>"
            client.user.setPresence({ activities: [{ name: `${song.name} / ${song.uploader.name}`, type: ActivityType.Listening }], status: "dnd" })
        } catch (err) {
            console.error(err)
        }
    })

    .on("addSong", (queue, song) => {
        const addEmbed = musicEmbedBuilder(client, queue, song, { color: "Green", text: "Añadido" })
        queue.textChannel.send({ embeds: [addEmbed] })
    })

    .on("addList", (queue, song) => {
        queue.textChannel.send(
        `**| ☑️ | Añadido | ☑️ |** \n**\`${song.uploader.name}\`** \n*\`${song.name} - [${song.formattedDuration}]\`* \nSolicitada por: ${song.user}`
        )
    })

    .on("error", (err, queue, song) => {
        console.log(`[!] Ocurrió un error${song ? ` con la canción ${song.name}` : ""}: ${err}`)
        try {
            const errorEmbed = normalEmbedBuilder(client, queue.textChannel, { color: "Red", title: "Error", description: `❌ | Ocurrió un error${song ? ` con la canción **${song.name}**` : ""}!\n\`${err}\``})
            queue.textChannel.send({ embeds: [errorEmbed] })

        } catch (msgErr) {
            console.log(err)
            console.log(msgErr)
        }
    })

    //* Search
    .on('searchNoResult', (message, query) =>
        message.channel.send(`❌ | No se ha encontrado un resultado para \`${query}\``)
    )

    .on("searchResult", async (message, result) => {
        let i = 0
        const search = await normalEmbedBuilder(
            client, message, {
                color: "Blue",
                title: "**Elige una de las opciones de abajo**",
                description: `${result.map(song => `**${++i}**.) **\`${song.uploader.name}\`** | *${song.name}* - \`${song.formattedDuration}\``).join("\n")}\n*Elige cualquier opcion o espera 20 segundos para cancelar.*`,
                showFooter: true
            }
        )

        setTimeout(() => {
            search.delete().catch(console.error)
        }, 20000)
    })

    //* Search Cancel
    .on("searchCancel", async(message) => {
        message.channel.send("❌ | Búsqueda cancelada")
    })

    //* Invalid Answer
    .on("searchInvalidAnswer", async(message) => {
        message.channel.send(`❌ | Respuesta Invalida, Búsqueda cancelada!`)
    })

    .on("empty", (message) => {
        message.channel.send("**[-]** El canal de voz se encuentra vacio, saliendo del canal...")
    })

    .on("finish", (queue) => {
        client.user.setPresence({ activities: [{ name: "w!help - /help", type: ActivityType.Playing }], status: "dnd"});
        console.log("\nEnded!")
    })

    .on("disconnect", (queue) => {
        client.user.setPresence({ activities: [{ name: "w!help - /help", type: ActivityType.Playing }], status: "dnd"});
        console.log("\nDisconnected!")
    })

    .on("ffmpegDebug", console.log)
}