const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MembershipScreeningFieldType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("verifymessage")
    .setDescription("Create the verify message")
//    .addChannelOption(option =>
//        option
//        .setName("channel")
//        .setDescription("Choice what channel is to verify")
//        .setRequired(true)
//        )
    .addStringOption(option =>
      option
      .setName("title")
      .setDescription("title of the verify embed")
      .setRequired(true)
      )
    .addStringOption(option =>
      option
      .setName("description")
      .setDescription("description of the verify embed")
      .setRequired(true)
      )
    .addStringOption(option =>
      option
      .setName("color")
      .setDescription("color of the verify embed")
      .setRequired(true)
      .addChoices(
        { name: 'Gris', value: 'Grey' },
        { name: 'Verde', value: 'Green' },
        { name: 'Rojo', value: 'Red' },
        { name: 'Azul', value: 'Blue' },
        { name: 'Blanco', value: 'White' },
        { name: 'Amarillo', value: 'Yellow' },
      )
      )
    .addRoleOption(option =>
      option
      .setName("role")
      .setDescription("role to verify")
      .setRequired(true)
      )
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async run(client, interaction){
//      const ch = interaction.options.getChannel("channel")
      const customTitle = interaction.options.getString("title")
      const customDescription = interaction.options.getString("description")
      const customVerifyRole = interaction.options.getRole("role")
      const selectedColor = interaction.options.get('color').value

      const verifyEmbed = new EmbedBuilder()
      .setTitle(customTitle)
      .setDescription(customDescription)
      .setColor(selectedColor)
      .setThumbnail(client.user.displayAvatarURL())

      const verifyButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId('verified')
        .setLabel('Verificate')
        .setStyle(ButtonStyle.Primary)
      )

//      var canal = client.channels.cache.find(channel => channel.id === ch.id)
      await interaction.reply({ embeds: [verifyEmbed], components: [verifyButton] })

//      const buttonID = interaction.customId
//      if(buttonID === 'verified') {

//        if (member.roles.cache.has(customVerifyRole)) {
//          member.roles.remove(customVerifyRole)
//          return interaction.reply({
//            content: "Rol removido exitosamente",
//            ephemeral: true
//          })
//        } else {
//          member.roles.add(customVerifyRole)
//          return interaction.reply({
//            content: "asdfghjklñ{}",
//            ephemeral:true
//          })
//        }
//      }

      const filter = i => i.customId === 'verified'

      const collector = interaction.channel.createMessageComponentCollector({ filter })

        collector.on('collect', async i => {
          await i.update({ content: "✅ | Te has verificado exitosamente", ephemeral: true })
          i.member.roles.add(customVerifyRole)
        })

//      await interaction.reply({ content: "Mensaje de verificacion enviado exitosamente!", ephemeral: true })
    }
        
}