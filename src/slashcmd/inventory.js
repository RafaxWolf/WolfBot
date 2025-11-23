const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js")
const inventory = require("../Schema/inventory-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Ver el inventario"),

    async run(client, interaction){
        // Datos de la base de datos
        let data = await inventory.findOne({
            userID: interaction.user.id,
            guildID: interaction.guild.id
        })
            // Si no hay datos envía un mensaje
            if(!data) return interaction.reply({ content: `❌ | Tu inventario esta vació o no dispones de uno.`, flags: MessageFlags.Ephemeral })
            
            // Si hay items en el inventario, los mapea y los muestra
            const mappedData = Object.keys(data.Inventory)
            .map((key) => {
                return `Item: ${key}
                Cantidad: (${data.Inventory[key]})`
            })
            .join(",\n\n")//.slice(0, 10)

            const inventoryEmbed = new EmbedBuilder()
            .setAuthor({ name: "Inventario", iconURL: client.user.displayAvatarURL() })
            .setTitle(`Inventario de ${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`**Todos los items en el inventario:**\n${mappedData}`)
            .setColor("Green")

            interaction.reply({ embeds: [inventoryEmbed], flags: MessageFlags.Ephemeral })
        
    }
        
}