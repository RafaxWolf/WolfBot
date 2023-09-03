//const ytdl = require('ytdl-core');

module.exports = {
  name: "play",
  alias: ["p"],
  inVoiceChannel: true,
async execute (client, message, args){

  const string = args.join(' ')
  const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin', 'el rap de eso tilin remix', 'El rap de eso tilin remix']
  //const bannedSongsUrl = ['https://www.youtube.com/watch?v=YgGFc_pOR3w&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/watch?v=YRC277E6Amw&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/shorts/sAkOUY0sjQw']

  //if(bannedSongsUrl.includes(string) || bannedSongsUrl.includes(args[0])) return message.channel.send("❌ | Esta Cancion/Video ha sido baneada del sistema de musica!")

  if(bannedSongsName.includes(string) || bannedSongsName.includes(args[0])) return message.channel.send("❌ | Esta Cancion/Video ha sido baneada del sistema de musica!")
  
/*    //---------------------
  const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin']
  //const bannedSondId = ['', '']
  //----------------------



  if(bannedSongsName.includes(videoName)) return message.channel.send("❌ | Esta Cancion/Video ha sido baneada del sistema de musica!")
   */
  //if (!string) return message.channel.send("❌ | Por favor ingrese la URL de la cancion o el nombre para iniciar la busqueda.")
  if(string){
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
  }else {
    const queue = client.distube.getQueue(message)
    if(queue.paused) {
      queue.resume()
      return message.channel.send("▶️ | Reproduciendo la cancion!")
    }
  }


 }

}