const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Decir algo")
    .addStringOption(option =>
        option.setName("mensaje")
        .setDescription('pone que decir')
        .setRequired(true)),

    async run(client, interaction){
        const input = interaction.options.getString("mensaje")
      interaction.reply({ content: `${input}` })
    }
        
}