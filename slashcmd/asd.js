const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("asd")
    .setDescription("ASD")
    .addStringOption(option => 
        option
        .setName('category')
        .setDescription('LOL')
        .addChoices(
            { name: 'asd', value: 'asd' },
            { name: 'dsa', value: 'dsa' },
        ))
    .addAttachmentOption(option => 
        option
        .setName("attachment")
        .setDescription("<sdfgasdfg>")
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async run(client, interaction){
        //const eleccion = interaction.options.get('category').value
        const attachment = interaction.options.getAttachment("attachment")
        //const name = attachment.name
        const URL = attachment.url
        const Name = attachment.name
        const fileType = attachment.contentType
        
        if(fileType !== "audio/mpeg") return interaction.reply({ content: `Critical Error:\n${fileType} | ${Name}: ${URL}` })
        //if(!fileType === "video/mp4") return interaction.reply({ content: `Critical Error:\n${fileType} | ${URL}` })
        //console.log(`${fileType} | ${Name}: ${URL}`)

        interaction.reply({ content: `${URL}` })

      //interaction.reply({ content: `You selected: ${eleccion}`, ephemeral: true })
    
    }

        
}