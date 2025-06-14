module.exports = {
  name: "play",
  alias: ["p"],
  inVoiceChannel: true,
async execute (client, message, args){
  const string = args.join(' ')

  const queue = client.distube.getQueue(message)

  const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin', 'el rap de eso tilin remix', 'El rap de eso tilin remix', 'el rap del tilin', 'El rap del tilin', 'gata only remix', 'Gata Only Remix']
  const bannedSongsUrl = ['https://www.youtube.com/watch?v=YgGFc_pOR3w&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/watch?v=YRC277E6Amw&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/shorts/sAkOUY0sjQw', 'https://www.youtube.com/watch?v=Kb_tm5uk0CQ', 'https://www.youtube.com/watch?v=3OkqimWqdNQ']

  if(bannedSongsName.includes(string) || bannedSongsName.includes(args[0])) {
    message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
    return;
  } 
  if(bannedSongsUrl.includes(string) || bannedSongsUrl.includes(args[0])) {
    message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
    return;
  } 

  if(string) {
    const voiceChannel = message.member.voice.channel; // Canal de voz donde este conectado el usuario
    try{
      await client.distube.play(voiceChannel, string, {
        member: message.member, // Usuario que solicito la canción
        textChannel: message.channel, // Canal de texto donde se ejecuto el comando
        message, // Mensaje
        skip: true, // Skipea si hay alguna canción sonando
      })

    } catch (error) {
      console.log(error)
      message.channel.send(`**[❌ | ¡Ha ocurrido un error! | ❌]**\n${error}`)
    }

  } else if(queue.paused) {
    queue.resume()
    return message.channel.send("▶️ | Reproduciendo la canción!")
  } else if(!queue && !string) {
    return await message.channel.send(`▶️ | No hay ninguna canción en pausa y no hay ninguna Canción en la cola.\n Agrega una Canción con **w!play (Nombre o enlace de la canción)**!`)
  }      

 }

}