const { SlashCommandBuilder } = require("discord.js")
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Para saber sobre los comandos (Slash commands)"),

    async run(client, interaction){

//------------------------------------------------------------------------Embeds------------------------------------------------------------------------

        const pages = [
            new EmbedBuilder()
            .setAuthor({ name: "Help", iconURL: "https://i.imgur.com/SaDhsHb.png" })
            .setTitle("Ayuda Comandos Básicos")
            .setColor("Aqua")
            .addFields(
                { name: "/ping", value: "Muestra la latencia del bot" },
                { name: "/serverinfo", value: "Muestra la información del servidor" },
                { name: "/userinfo", value: "Muestra la información del usuario mencionado" },
                { name: "/help", value: "Muestra la ayuda de los comandos" },
            )
            .setTimestamp(),

            new EmbedBuilder()
            .setAuthor({ name: "Help", iconURL: "https://i.imgur.com/SaDhsHb.png" })
            .setTitle("Ayuda Encriptacion/Desencriptación")
            .setColor("Aqua")
            .addFields(
                { name: "/encrypt <texto> <contraseña> <método> (AES, B64, Hex)", value: "Encriptar un mensaje con diversos métodos y con contraseñas hechas por el usuario" },
                { name: "/decrypt <texto> <contraseña> <método> (AES, B64, Hex)", value: "Desencriptar un mensaje con diversos métodos y con contraseñas hechas por el usuario" },
            )
            .setTimestamp(),

            new EmbedBuilder()
            .setAuthor({ name: "Help", iconURL: "https://i.imgur.com/SaDhsHb.png" })
            .setTitle("Ayuda Inventario")
            .setColor("Aqua")
            .addFields(
                { name: "/inventario", value: "Muestra tu inventario (Si dispones de uno)" },
                { name: "/inventario <usuario>", value: "Muestra el inventario del usuario mencionado (Si dispone de uno)" },
            )
            .setTimestamp(),
        ]

/*
    const help1 = new EmbedBuilder()
    .setAuthor({ name: "Help", iconURL: "https://i.imgur.com/SaDhsHb.png" })
    .setTitle("Sistema de Encriptacion/Desencriptación")
    .setColor("Aqua")
    .addFields(
        { name: "/encrypt <texto> <contraseña> <método> (AES, B64, Hex)", value: "Encriptar un mensaje con diversos métodos y con contraseñas hechas por el usuario" },
        { name: "/decrypt <texto> <contraseña> <método> (AES, B64, Hex)", value: "Desencriptar un mensaje con diversos métodos y con contraseñas hechas por el usuario" },
    )
    .setTimestamp()
*/
    
    //  **/jump <number>** - Saltar a una canción en la lista de reproducción
    //  **/remove <number>** - Eliminar una canción de la lista de reproducción
    //  **/clear** - Limpiar la lista de reproducción

    }
        
}