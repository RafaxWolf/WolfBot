const { EmbedBuilder } = require('discord.js')
const lyricsFinder = require('lyrics-finder')
const Genius = require('genius-lyrics')
require("dotenv").config()

module.exports = {
    name: "lyrics",
    alias: ["letra"],
  
  async execute (client, message, args){
  
    const Client = new Genius.Client(process.env.GENIUS_API_KEY)

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send("❌ | No hay nada en la cola!")

    const song = queue ? queue.songs[0] : null;

    const lyricsEngine = args[0]?.toLowerCase() || ' '
    const songName = args.slice(1).join(" ") || (song ? song.name : null)

    if(!songName){
      return message.channel.send("❌ | No hay ninguna canción en reproducción y tampoco has especificado alguna!")
    }

    let lyrics = ''
    let thumbnail = ''

    if(lyricsEngine === 'genius') {
      try{
        const searches = await Client.songs.search(`${song.uploader.name} ${songName}`)

        const firstSong = searches[0];

        if(firstSong){
          console.log("Sobre la canción:\n", firstSong, "\n")

          lyrics = await firstSong.lyrics();
          thumbnail = firstSong.thumbnail
        } else {
          lyrics = 'No se encontraron resultados para la canción especificada!'
        }
      } catch (err) {
        console.error(err)
        lyrics = '[!] Hubo un error al buscar la letra en Genius!'
      }
    } else {
      try{
        lyrics = await lyricsFinder('', songName) || 'No se encontraron resultados para la canción especificada!'
      } catch (err) {
        console.error(err)
        lyrics = '[!] Hubo un error al buscar la letra!'
      }
    }

    if(lyrics.length > 4096){
      lyrics = lyrics.slice(0, 4093) + '...'
    }

    const embed = new EmbedBuilder()
    .setAuthor({ name: "Letra", iconURL: "https://i.imgur.com/SaDhsHb.png" })
    .setThumbnail(thumbnail || queue?.songs[0].thumbnail || '')
    .setTitle(`${songName}`)
    .setURL(song.url)
    .setDescription(lyrics)
    .setFooter({ text: `Source: ${lyricsEngine || 'LyricsFinder'}` })
    .setTimestamp()

    message.channel.send({ embeds: [embed] })
    
        /*
        const embed = new EmbedBuilder()
        .setAuthor({ name: "Letra", iconURL: "https://i.imgur.com/SaDhsHb.png" })
        .setThumbnail(song.thumbnail)
        .setTitle(`${song.name}`)//\n${song.uploader.name}
        .setURL(song.url)
        .setDescription(`${lyrics.split('\n')}`)
        .setFooter({ text: 'Fuente Genius', iconURL: 'https://i.imgur.com/NwLxeay.png' })
        .setTimestamp()

        message.channel.send({ embeds: [embed] })
        */
   }
  
  }