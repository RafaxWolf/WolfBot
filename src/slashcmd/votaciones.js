const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const poll = require("../Schema/poll-schema")

let MessageButton = ButtonBuilder
let MessageEmbed = EmbedBuilder
let MessageActionRow = ActionRowBuilder

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Hace votaciones")
    .addStringOption(option => 
        option
        .setName("question")
        .setDescription("tema de la votacion")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("option1")
        .setDescription("1ra opción de la votacion")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("option2")
        .setDescription("2da opción de la votacion")
        .setRequired(true)
        ),
    async run(client, interaction){
      const ask = interaction.options.getString("question")
      const op1 = interaction.options.getString("option1")
      const op2 = interaction.options.getString("option2")

      let newdata = new poll({
        userID: interaction.member,
        ask: ask,
        opcion1: op1,
        opcion2: op2,
        timestamp: Date.now()
      })
      await newdata.save()

      const poll1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('option1')
        .setLabel(op1)
        .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new MessageButton()
        .setCustomId('option2')
        .setLabel(op2)
        .setStyle(ButtonStyle.Primary)
      )

    const strawpoll = new MessageEmbed()
    .setTitle(ask)
    .addFields(
      { name: `${op1}`, value: ``, inline: true },
      { name: `${op2}`, value: ``, inline: true },
    )
    .setColor("Blurple")
    .setTimestamp()

    interaction.reply({ embeds: [strawpoll], components: [poll1] })

    const filterA = a => a.customId === 'option1'
    const filterB = b => b.customId === 'option2'

    const collector = interaction.channel.createMessageComponentCollector({ filterA, filterB });

    collector.on('collect', async a => {
        if (a.customId === 'option1') {
            await a.editReply({ embeds: [strawpoll], components: [answer1], ephemeral: true, })
        }
    })
    collector.on('collect', async b => {
        if (b.customId === 'option2') {
            await b.editReply({ embeds: [strawpoll], components: [answer2], ephemeral: true })
        }
    })

    }
        
}