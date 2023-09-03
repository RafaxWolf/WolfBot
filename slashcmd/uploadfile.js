const { SlashCommandBuilder, SharedNameAndDescription } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("uploadfile")
    .setDescription("Subir un archivo")
    .addAttachmentOption(option =>
        option
        .setName("file")
        .setDescription("asd")
        //.setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("asdf")
        .setDescription("fdas")
        .setMaxLength(10)
        )
    .addNumberOption(option =>
        option
        .setName("qwerty")
        .setDescription("ytrewq")
        .setMaxValue(10)
        ),

    async run(client, interaction){
      const fileUpload = interaction.options.getAttachment("file")
      const string = interaction.options.getString("asdf")
      const number = interaction.options.getNumber("qwerty")
      if(fileUpload){
        const fileURL = fileUpload.url
        interaction.reply({ content: `${fileURL}` })
      }
        if(string){
            interaction.reply({ content: `${string}` })
        }
        if(number){
            interaction.reply({ content: `${number}` })
        }


      //interaction.reply({ content: `wait a second...` })
    }
        
}