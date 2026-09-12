module.exports = {
    name: "play-file",
    alias: ["pfile"],
    inVoiceChannel: true,

    async execute (client, message, args){

      try {
        const voiceChannel = message.member.voice.channel;
        await client.distube.play(voiceChannel, "file://../Musica/Una Noche.mp3", {
            member: message.member,
            textChannel: message.channel,
            message,
            skip: true
        })
      } catch (err) {
        console.error("❌ | Ha ocurrido un error al Intentar Reproducir la cancion:", err)
      }

    }

}