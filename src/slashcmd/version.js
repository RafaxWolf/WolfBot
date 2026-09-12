const { SlashCommandBuilder, MessageFlags } = require("discord.js")
const { normalEmbedBuilder } = require("../functions/embedBuilder")
const { version } = require('../../package.json')

const getBasePath = require("../utils/getBasePath")
const fs = require("fs")
const path = require("path")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Ver la actual version de WolfBot!"),

    async run(client, interaction){
      try {
        if(getBasePath() == "./src"){
          
        } else if (getBasePath() == "./build"){

        } else {
          console.error("")
          interaction.reply({ content: "Ha ocurrido un error al Intentar obtener la informacion.\nPor favor levante un ticket informando del error.", flags: MessageFlags.Ephemeral })
        }
      } catch (err) {

      }

      const versionEmbed = new normalEmbedBuilder(client, interaction, { 
        color: "Blue", 
        title: "Informacion de WolfBot", 
        description: `aasd`, 
        showFooter: true 
      })

      //interaction.reply({ content: `Version actual: **${version}**`, flags: MessageFlags.Ephemeral })
    }
        
}