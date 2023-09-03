const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const inventory = require("../Schema/inventory-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Ver el inventario de alguien")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("asd")
        .setRequired(true)),

    async run(client, interaction){
      const user = interaction.options.getUser("user")

        inventory.findOne({ userID: user.id, guildID: interaction.guild.id },
            async (err, data) => {
                if(!data) return interaction.reply({content: `❌ | El inventario de ${user} esta vacio o no dispone de uno!`, ephemeral: true })
                
                const mappedData = Object.keys(data.Inventory)
                .map((key) => {
                    return `Item: ${key}\nCantidad: (${data.Inventory[key]})`
                })
                .join(",\n\n")//.slice(0, 10)

                const inventoryEmbed = new EmbedBuilder()
                .setTitle(`Inventario de ${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Todos los items en el inventario:\n${mappedData}`)

                interaction.reply({ embeds: [inventoryEmbed], ephemeral: true })
            }
        )


    }
        
}