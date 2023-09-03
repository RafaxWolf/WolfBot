const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Escuchar musica en cualquier canal!")
    .addSubcommand(subcommand =>
        subcommand
        .setName("songs")
        .setDescription("Canciones sin video!")
        .addStringOption(option =>
            option
            .setName("song")
            .setDescription("Introduce una cancion para buscar o introduce el link para reproducirla automaticamente")
            )
        .addAttachmentOption(option =>
            option
            .setName("audio")
            .setDescription("Reproduce una cancion directamente de un archivo mp3!")
            )
        )
    .addSubcommand(subcommand =>
        subcommand
        .setName("videos")
        .setDescription("Canciones con video!")
        .addAttachmentOption(option =>
            option
            .setName("video")
            .setDescription("Reproducir videos directamente del archivo mp4!")
            )
        .addStringOption(option => 
            option
            .setName("clip")
            .setDescription("ASd")
        )
    ),
    inVoiceChannel: true,
    async run(client, interaction){
      const string = interaction.options.getString("song")
      const audioFile = interaction.options.getAttachment("audio")
      const videoFile = interaction.options.getAttachment("video")
      if(audioFile){
        const audioFileUrl = audioFile.url
        const audioFileType = audioFile.contentType
        if(audioFileType !== "audio/mpeg") return interaction.reply({ content: `❌ | No puedes reproducir nada que no sea una cancion en **mp3**!\n${fileType}` })
        interaction.reply({ content: "✅ | Ok reproduciendo cancion | ✅", ephemeral: true })
        client.distube.play(interaction.member.voice.channel, audioFileUrl, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
          })
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
      
        //if(!fileType === "video/mp4") return interaction.reply({ content: "❌ | No puedes reproducir nada que no sea un video o una cancion!" })

        if(string) {
        interaction.reply({ content: "✅ | Ok reproduciendo cancion | ✅", ephemeral: true })
            client.distube.play(interaction.member.voice.channel, string, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
              }) 
        }
    
    }
        
}