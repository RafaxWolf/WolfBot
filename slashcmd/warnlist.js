const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const warn = require("../Schema/warn-schema");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warnlist")
    .setDescription("Ver la lista de warneos de un usuario!")
    .addUserOption(option => 
        option
        .setName("usuario")
        .setDescription("Usuario al cual ver su lista de warneos")
        .setRequired(true)
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
      if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: "❌ || No eres un moderador!", ephemeral: true })

      const user = interaction.options.getUser("usuario")
        
        let warnData = await warn.find({ userID: user.id }).sort([["timestamp", "descending"]])
          warnData = warnData.slice(0, 10);
          if(warnData){
            let i = 0

            const warnsListEmbed = new EmbedBuilder()
            .setTitle(`Lista de warneos de **${user.tag}**`)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`${warnData.map((data) => `${++i}.) Moderador: ${data.moderadorID}\nRazon: *\`${data.razon}\`*\nID del warneo: **\`${data.id}\`**\nMomento del warneo: *${data.timestamp}*`).join("\n\n")}`)
            
            interaction.reply({ embeds: [warnsListEmbed], ephemeral: true })
          }else {
            return interaction.reply({ content: "❌ || Este usuario no tiene ningun warneo!", ephemeral: true })
          } 

//    interaction.reply({ content: `${warnData
//        .map((data, index) => `${++i}.) **${user.tag}**
//        **${data.moderadorID}**
//       *\`${data.razon}\`*
//        ${data.id}
//        `)}` })

    }
        
}