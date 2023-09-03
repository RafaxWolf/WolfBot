const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("chsay")
    .setDescription("Mandar un mensaje a un canal en especifico")
    .addChannelOption(option =>
         option
         .setName("canal")
         .setDescription("Canal donde enviar el mensaje")
         .setRequired(true)
         )
    .addStringOption(option =>
        option
        .setName("mensaje")
        .setDescription("Mensaje a enviar al canal")
        .setRequired(true)
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async run(client, interaction){
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'No eres un moderador!', ephemeral: true })
      const ch = interaction.options.getChannel("canal")
      const msg = interaction.options.getString("mensaje")

      var canal = client.channels.cache.find(channel => channel.id === ch.id)
      canal.send(msg)

      interaction.reply({ content: 'Message sent!', ephemeral: true })
    }
        
}