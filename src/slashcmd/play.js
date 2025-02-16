const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Escuchar música en cualquier canal!")
    .addStringOption(option =>
        option
        .setName("song")
        .setDescription("Nombre de la canción a reproducir")
    ),
    //inVoiceChannel: true,
    async run(client, interaction){
      const string = interaction.options.getString("song")
      if(string) {
        interaction.reply({ content: "✅ | Ok reproduciendo canción | ✅", ephemeral: true })
            client.distube.play(interaction.member.voice.channel, string, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
              }) 
        }
/* 
      const audioFile = interaction.options.getAttachment("audio")
      const videoFile = interaction.options.getAttachment("video")
      if(audioFile){
        const audioFileUrl = audioFile.url
        const audioFileType = audioFile.contentType
        if(audioFileType === "audio/mpeg"){
            interaction.reply({ content: "✅ | Ok reproduciendo canción | ✅", ephemeral: true })
            client.distube.play(interaction.member.voice.channel, audioFileUrl, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
              })
        } else {
            return interaction.reply({ content: `❌ | No puedes reproducir nada que no sea una canción en **mp3**!\n${fileType}` })            
        } 

        //if(audioFile) return interaction.reply({ content: "Hello World\nASD TEST", ephemeral: true })
        }

      if(videoFile){
        const videoFileUrl = videoFile.url
        const videoFileType = videoFile.contentType
        if(videoFileType !== "video/mp4") return interaction.reply({ content: "❌ | asd" })
        client.distube.play(interaction.member.voice.channel, videoFileUrl, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
          })      
    }
      
        //if(!fileType === "video/mp4") return interaction.reply({ content: "❌ | No puedes reproducir nada que no sea un video o una canción!" })
*/
    
    }
        
}