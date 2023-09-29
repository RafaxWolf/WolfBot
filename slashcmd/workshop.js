const workshop = require('../Schema/workshop-schema')
const { SlashCommandBuilder, StringSelectMenuOptionBuilder } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("workshop")
    .setDescription("WIP")
    //.addSubcommand(subcommand =>
    //    subcommand
    //    .setName("home")
    //    .setDescription("WIP")
    //)
    //.addSubcommand(subcommand =>
    //    subcommand
    //    .setName("search")
    //    .setDescription("WIP")
    //    .addStringOption(option =>
    //        option
    //        .setName("item")
    //        .setDescription("Name or ID of the item or creator (WIP)")
    //        .setRequired(true)
    //    )
    //)
    //.addSubcommand(subcommand =>
    //    subcommand
    //    .setName("about")
    //    .setDescription("About the Community Workshop!")
    //)
    ,

    async run(client, interaction){

        const workshopSelect = new StringSelectMenuBuilder()
        .setCustomId('workshop')
        .setPlaceholder(`¡Bienvenido a la Workshop de ${interaction.guild.name}!`)
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Home')
                .setDescription("Revisa lo mas popular, lo mas reciente, etc")
                .setValue('wshome'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Search')
                .setDescription("Busca el item que quieras y/o necesites con su nombre, autor o ID")
                .setValue('wssearch'),
            new StringSelectMenuOptionBuilder()
                .setLabel('About')
                .setDescription("Acerca de la Workshop")
                .setValue('wsabout')
        )

        const row = new ActionRowBuilder()
        .addComponents(workshopSelect)

        await interaction.reply({ ephemeral: true, components: [row] })

      //if (interaction.options.getSubcommand("about")) {
          

    }
        
}