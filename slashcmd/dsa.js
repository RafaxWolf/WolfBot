const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dsa")
    .setDescription("dsa")
    .addSubcommand(subcommand =>
        subcommand
        .setName("qwerty")
        .setDescription("qwerty")
        .addUserOption(option => option.setName("qwertyuser").setDescription("qwertyUser")
        ))
    .addSubcommand(subcommand =>
        subcommand
        .setName("encrypt")
        .setDescription("encrypt")),

    async run(client, interaction){
      
        interaction.reply({ content: "asdasd" })

    }
        
}