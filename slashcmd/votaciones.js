const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const Discord = require("discord.js")
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
        .setName("votacion")
        .setDescription("tema de la votacion")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("opcion1")
        .setDescription("1ra opcion de la votacion")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("opcion2")
        .setDescription("2da opcion de la votacion")
        .setRequired(true)
        ),
    async run(client, interaction){
      const ask = interaction.options.getString("votacion")
      const op1 = interaction.options.getString("opcion1")
      const op2 = interaction.options.getString("opcion2")

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
        .setStyle('PRIMARY')
      )
      .addComponents(
        new MessageButton()
        .setCustomId('option2')
        .setLabel(op2)
        .setStyle('PRIMARY')
      )

      const answer1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('asd')
        .setLabel(op1)
        .setStyle('SUCCESS')
        .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
        .setCustomId('dsa')
        .setLabel(op2)
        .setStyle('SECONDARY')
        .setDisabled(true)
      )

      const answer2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('asd')
        .setLabel(op1)
        .setStyle('SECONDARY')
        .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
        .setCustomId('dsa')
        .setLabel(op2)
        .setStyle('SUCCESS')
        .setDisabled(true)
      )

    const strawpoll = new MessageEmbed()
    .setTitle(ask)
    .setColor("BLURPLE")
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