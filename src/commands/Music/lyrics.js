const Genius = require('genius-lyrics')
const { GENIUS_API_KEY } = require('../../config')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'lyrics',
  alias: ['letra'],

  async execute(client, message, args) {
    const queue = client.distube.getQueue(message.guild)
    const currentSong = queue?.songs[0]
    const query = args.join(' ').trim() || currentSong?.name

    if (!query) {
      return message.channel.send('❌ | Indica una canción o reproduce una antes de pedir la letra.')
    }

    if (!GENIUS_API_KEY) {
      return message.channel.send('❌ | Falta configurar `GENIUS_API_KEY` para buscar letras.')
    }

    try {
      const genius = new Genius.Client(GENIUS_API_KEY)
      const [result] = await genius.songs.search(query)

      if (!result) {
        return message.channel.send('❌ | No se encontraron letras para esa canción.')
      }

      const lyrics = await result.lyrics()
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setAuthor({ name: 'Letra' })
        .setTitle(result.title || query)
        .setDescription(lyrics.length > 4096 ? `${lyrics.slice(0, 4093)}...` : lyrics)
        .setFooter({ text: 'Fuente: Genius' })
        .setTimestamp()

      if (result.url) embed.setURL(result.url)
      if (result.thumbnail) embed.setThumbnail(result.thumbnail)

      await message.channel.send({ embeds: [embed] })
    } catch (error) {
      console.error('Error al buscar letra:', error)
      await message.channel.send('❌ | No pude obtener la letra de esa canción.')
    }
  }
}
