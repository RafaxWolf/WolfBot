const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const warn = require('../Schema/warn-schema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warnar a un usuario!")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Usuario a warnear")
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Razon del warn")
        .setRequired(true)
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
    async run(client, interaction){
        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: "No eres un moderador!", ephemeral: true })
      const user = interaction.options.getUser("user")
      const reason = interaction.options.getString("reason")
        let datosnuevos = new warn({
            userID: user.id,
            moderadorID: interaction.member,
            razon: reason,
            timestamp: Date.now(),
        })
        await datosnuevos.save()

        var modLog = client.channels.cache.find(channel => channel.id === '991746789034184725');
        modLog.send(`***MODLOG*** || El moderador ${interaction.member} Ha Warneado a ${user} por la razon: **\`${reason}\`**`)

      const warned = new EmbedBuilder()
      .setTitle("**¡Nuevo Warn!**")
      .setColor("Red")
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name:"Moderador", value: `${interaction.member}`, inline: true },
        { name: "Warneado", value: `${user}`, inline: true },
        { name: "Razon", value: `**${reason}**`, inline: true }
        )
      .setTimestamp();

        var warnCh = client.channels.cache.find(channel => channel.id === '1064438308777762848')
        warnCh.send({ embeds: [warned] })
      
      interaction.reply({ content: "Warneo enviado!", ephemeral: true })
    }
        
}