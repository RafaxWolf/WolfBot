const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, MessageFlags } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("usersend")
    .setDescription("Enviar un mensaje a un miembro")
    .addUserOption(option => 
        option
        .setName("user")
        .setDescription("Usuario a enviar el mensaje")
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
      const user = interaction.options.getUser("user")
      const msg = interaction.options.getString("message")

      user.send(msg)

      interaction.reply({ content: 'Mensage enviado', flags: MessageFlags.Ephemeral })
    }
        
}
