const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const warn = require('../Schema/warn-schema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warnremove")
    .setDescription("Quitar un warneo de un usuario!")
    .addStringOption(option =>
        option
        .setName("id")
        .setDescription("asd")
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
      const warnId = interaction.options.getString("id")

      let warnData = await warn.findOne({ id: warnId })

      if(!warnData) return interaction.reply({ content: "❌ | La id no concide con ninguna de algun warneo existente!", ephemeral: true })

      await warn.findOneAndDelete({ id: warnId })

      interaction.reply({ content: "✅ | Warn Removed!", ephemeral: true })

    }
        
}