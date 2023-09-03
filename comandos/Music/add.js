module.exports = {
    name: "add",
    alias: [""],
    inVoiceChannel: true,
  execute (client, message, args){
  
    const string = args.join(' ')
    if (!string) return message.channel.send("❌ | Por favor ingrese la URL de la cancion o el nombre para iniciar la busqueda.")

        client.distube.play(message.member.voice.channel, string, {
          member: message.member,
          textChannel: message.channel,
          message,
          position: 1
        })

   }
  
  }