const axios = require('axios')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "lyrics",
    alias: ["letra"],
  
async execute (client, message, args){
    const queue = client.distube.getQueue(message)
    const song = queue.songs[0]
    let title = song.name

    let lyricsTitle = title.toLowerCase()

    const getLyrics = (lyricsTitle) => 
        new Promise(async (ful, rej) => {
        const url = new URL('https://some-random-api.ml/lyrics')
        url.searchParams.append('title', title)
        console.log("url", url)

        try {
            const { data } = await axios.get(url.href)
            ful(data)
        } catch (error) {
            rej(error)
        }
    });

    function substring(length, value) {
        const replaced = value.replace(/\n/g, "--")
        const regex = `.{1,${length}}`
        const lines = replaced
            .match(new RegExp(regex, "g"))
            .map((line) => line.replace(/--/g, "\n"))

            return lines;
    }

    const createMessage = async (title) => {
        try{

            const data = await getLyrics(title)

            const embedlyrics = substring(4096, data.lyrics).map((value, index) => {
                const isFirst = index === 0;
    
                return new EmbedBuilder()
                    .setTitle(isFirst ? `${data.title} - ${data.author}` : null)
                    .setThumbnail(isFirst ? { url: data.thumbnail.genius } : null)
                    .setDescription(value)
                
            })
        
        return  { embeds: [embedlyrics] }
        //message.channel.send({ embeds: [embedlol] })
        } catch (error) {
            return "❌ | No pude encontrar la letra de esta cancion."
           //message.channel.send("❌ | No he podido encontrar la letra de esta cancion")
        }
    }

    const sendLyrics = (songTitle) => {
        return createMessage(songTitle)
        .then(async (res) => {
            console.log({ res })
            await message.channel.send(res)
        })
        .catch((err) => console.log({ err }))
    }

    if (title) return sendLyrics(title)
  
   }
  
  }