module.exports = {
    name: "add",
    alias: ["añadir"],
    inVoiceChannel: true,
  execute (client, message, args){
  
    const string = args.join(' ')
    if (!string) return message.channel.send("❌ | Por favor ingrese la URL de la canción o el nombre para iniciar la búsqueda.")

    const bannedSongsName = ['Eso Tilin', 'El rap de eso tilin', 'el rap de eso tilin', 'el rap de eso tilin remix', 'El rap de eso tilin remix', 'el rap del tilin', 'El rap del tilin'] // Lista de los nombres de canciones baneadas
    const bannedSongsUrl = ['https://www.youtube.com/watch?v=YgGFc_pOR3w&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/watch?v=YRC277E6Amw&pp=ygUTZWwgcmFwIGRlIGVzbyB0aWxpbg%3D%3D', 'https://www.youtube.com/shorts/sAkOUY0sjQw', 'https://www.youtube.com/watch?v=Kb_tm5uk0CQ', 'https://www.youtube.com/watch?v=3OkqimWqdNQ'] // Links de las canciones Baneadas

    if(bannedSongsName.includes(string) || bannedSongsName.includes(args[0])) {
      message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
      return;
    } // Evita que la canción con un nombre baneado se reproduzca
    if(bannedSongsUrl.includes(string) || bannedSongsUrl.includes(args[0])) {
      message.channel.send("❌ | Esta Canción/Video ha sido baneada del sistema de música!")
      return;
    } // Evita que la canción con url baneada se reproduzca

        client.distube.play(message.member.voice.channel, string, {
          member: message.member,
          textChannel: message.channel,
          message,
          position: 100
        }) // Reproduce la canción y/o video

   }

  }