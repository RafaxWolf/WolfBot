const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gender")
    .setDescription("Puedes definir tu genero (opcional)"),

    async run(client, interaction){
      
    }
        
}