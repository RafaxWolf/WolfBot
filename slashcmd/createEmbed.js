const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("creatembed")
    .setDescription("Create a custom embed")
    .addStringOption(option => 
        option
        .setName("title")
        .setDescription("adds title to our embed")
        .setRequired(true))
        .addStringOption(option => 
            option
            .setName("description")
            .setDescription("adds a description to our embed")
            .setRequired(true)),

    async run(client, interaction){
      const customTitle = interaction.options.getString("title")
      const customDescription = interaction.options.getString("description")

      const customEmbed = new EmbedBuilder()
      .setColor("Aqua")
      if(customTitle) customEmbed.setTitle(customTitle)
      if(customDescription) customEmbed.setDescription(customDescription)
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })

      interaction.reply({ embeds: [customEmbed], ephemeral: true })
    }
        
}