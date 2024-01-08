const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Tienda del servidor")
    .addSubcommand(subcommand =>
        subcommand
        .setName("buy")
        .setDescription("asd")
        .addStringOption(option =>
            option
            .setName("item")
            .setDescription("dsa")))
        .addSubcommand(subcommand =>
            subcommand
            .setName("list")
            .setDescription("asd"))
        .addSubcommand(subcommand =>
            subcommand
            .setName("help")
            .setDescription("asd")),
    async run(client, interaction){
      
        

    }
        
}