const { SlashCommandBuilder } = require("discord.js")
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, SelectMenuBuilder } = require('discord.js')
const Discord = require("discord.js")
const gachapon = require("../Schema/gacha-schema")
const { banner1, banner2, banner3, perma } = require('../banners.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gacha")
    .setDescription("Hacer tiradas a uno o mas banners mensuales"),

    async run(client, interaction){
      if(banner2 === '') {
      const onebanner1 = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
        .setCustomId('asd')
        .setPlaceholder('¡Elige el banner!')
      )
    }

//      if(!banner2 === 'asdasd') {
//      const twobanners = new ActionRowBuilder()
//      }
      

    }
        
}