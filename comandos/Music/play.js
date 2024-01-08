//const ytdl = require('ytdl-core');

module.exports = {
  name: "play",
  alias: ["p"],
  inVoiceChannel: true,
async execute (client, message, args){

  const string = args.join(' ')
  const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin', 'el rap de eso tilin remix', 'El rap de eso tilin remix', 'el rap del tilin', 'El rap del tilin']
  const bannedSongsUrl = ['https://www.youtube.com/watch?v=YgGFc_pOR3w&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/watch?v=YRC277E6Amw&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/shorts/sAkOUY0sjQw', 'https://www.youtube.com/watch?v=Kb_tm5uk0CQ', 'https://www.youtube.com/watch?v=3OkqimWqdNQ']

  //if(bannedSongsUrl.includes(string) || bannedSongsUrl.includes(args[0])) return message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")

  if(bannedSongsName.includes(string) || bannedSongsName.includes(args[0])) {
    message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
    return;
  } 
  if(bannedSongsUrl.includes(string) || bannedSongsUrl.includes(args[0])) {
    message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
    return;
  } 
/*    //---------------------
  const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin']
  //const bannedSongsId = ['', '']
  //----------------------

  if(bannedSongsName.includes(videoName)) return message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
   */
  //if (!string) return message.channel.send("❌ | Por favor ingrese la URL de la canción o el nombre para iniciar la búsqueda.")
  if(string){
    try{
      client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message,
        skip: true
      })
    } catch (error) {
      message.channel.send(error)
    }
  }else {
    //const queue = client.distube.getQueue(message)
    if(queue.paused) {
      queue.resume()
      return message.channel.send("▶️ | Reproduciendo la canción!")
    }
  }
  
  const queue = client.distube.getQueue(message)
  if(!queue && !string){
    return await message.channel.send(`▶️ | No se esta Reproduciendo nada actualmente y no hay ninguna Canción en la cola.\n Agrega una Canción con **w!play (Nombre o enlace de la canción)**!`)
  }

 }

}