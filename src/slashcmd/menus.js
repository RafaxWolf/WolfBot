const { SlashCommandBuilder } = require("discord.js")
const Discord = require("discord.js")
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Prueba"),

    async run(client, interaction){
      const row = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Selecciona uno')
        .addOptions(
            {
                label: 'asd',
                description: 'Test 1',
                value: 'Dj',
            },
            {
                label: 'dsa',
                description: 'Test 2',
                value: 'Hacker',
            },
        ),
      );

      await interaction.reply({ content: 'Pong', components: [row] });

      const filter = i => i.customId === 'select' && i.user.id === interaction.member.id;

      const collector = interaction.channel.createMessageComponentCollector({ filter })

      collector.on('collect', async i => {
        await i.update({ content: 'rdyrd' })
      })

    }
        
}