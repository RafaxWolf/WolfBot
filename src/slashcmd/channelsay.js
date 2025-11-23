const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, MessageFlags, InteractionContextType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("chsay")
    .setDescription("Mandar un mensaje a un canal en especifico")
    .addChannelOption(option =>
         option
         .setName("channel")
         .setDescription("Canal donde enviar el mensaje")
         .setRequired(true)
         )
    .addStringOption(option =>
        option
        .setName("message")
        .setDescription("Mensaje a enviar")
        .setRequired(true)
        )
        .setContexts(InteractionContextType.Guild)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        
    async run(client, interaction){
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'No eres un moderador!', ephemeral: true })
      const ch = interaction.options.getChannel("canal")
      const msg = interaction.options.getString("mensaje")

      var canal = client.channels.cache.find(channel => channel.id === ch.id)
      canal.send(msg)

      interaction.reply({ content: 'Message sent!', flags: MessageFlags.Ephemeral })
      interaction.deleteReply()
    
    }
     
}