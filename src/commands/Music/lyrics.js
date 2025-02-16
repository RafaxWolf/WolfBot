const { EmbedBuilder } = require('discord.js')
const Genius = require('genius-lyrics')
require("dotenv").config()

module.exports = {
    name: "lyrics",
    alias: ["letra"],
  
  async execute (client, message, args){
  
    const Client = new Genius.Client(process.env.GENIUS_API_KEY)

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send("❌ | No hay nada en la cola!")

    const song = queue.songs[0]

    try{
      const searches = await Client.songs.search(`${song.name} ${song.uploader.name}`)

      console.log(song.name)

      const firstSong = searches[0];

      console.log("Sobre la canción:\n", firstSong, "\n")

      const lyrics = await firstSong.lyrics();

      if(lyrics) {
        const embed = new EmbedBuilder()
        .setAuthor({ name: "Letra", iconURL: "https://i.imgur.com/SaDhsHb.png" })
        .setThumbnail(song.thumbnail)
        .setTitle(`${song.name}`)//\n${song.uploader.name}
        .setURL(song.url)
        .setDescription(`${lyrics.split('\n')}`)
        .setFooter({ text: 'Fuente Genius', iconURL: 'https://i.imgur.com/NwLxeay.png' })
        .setTimestamp()

        message.channel.send({ embeds: [embed] })
      } else {
        message.channel.send("❌ | No se ha podido encontrar la letra de la canción!")
      }
    } catch (error) {
      console.error(error)
    }
  
   }
  
  }