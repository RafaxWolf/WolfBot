const { SlashCommandBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("workshop")
    .setDescription("Sistema de Workshop del servidor!"),

    async run(client, interaction){

        //const vipRole = "937228279063138384"

        //const hasRole = interaction.member.roles.cache.has()

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

        const row = new ActionRowBuilder().addComponents(workshopSelect)

        try{
            await interaction.reply({ components: [row] })
            //await interaction.reply({ content: "Las opciones de la Workshop fueron enviadas a los mensajes internos *(Mensaje directo)*", ephemeral: true })
        } catch (error) {
            console.error(error)
            //await interaction.reply({ content: "¡No se pudo enviar el mensaje! por favor verificar si tienes los MD activados!", ephemeral: true })
        }
    },
    
};