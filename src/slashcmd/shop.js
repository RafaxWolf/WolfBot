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
            .setDescription("Item a comprar")))

        .addSubcommand(subcommand =>
            subcommand
            .setName("list")
            .setDescription("Mostrar los items de la tienda"))
            
        .addSubcommand(subcommand =>
            subcommand
            .setName("help")
            .setDescription("Ayuda de la tienda")),
    async run(client, interaction){
      
        

    }
        
}