const { SlashCommandBuilder, MessageFlags } = require("discord.js")
const fs = require("fs")
const items = require("../shopitems")
const chalk = require("chalk")
const path = require("path")
const getBasePath = require("../utils/getBasePath");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("additem")
    .setDescription("Comando para añadir item a la tienda (w!shop) desde discord")
    .addStringOption(option =>
        option
        .setName("name")
        .setDescription("Nombre del item a añadir a la tienda")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("price")
        .setDescription("Precio del item")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("rarity")
        .setDescription("Rareza del item")
        .addChoices(
            { name: "Común", value: "common" },
            { name: "Raro", value: "rare" },
            { name: "Muy Raro", value: "very-rare" },
            { name: "Legendario", value: "legendary" },
            { name: "Épico", value: "epic" },
            { name: "Único", value: "unique" }
        )
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("description")
        .setDescription("Descripción del item")
    )
    .addStringOption(option =>
        option
        .setName("type")
        .setDescription("Tipo del item")
    ),

    async run(client, interaction){
    // ----------------------- Item Data ----------------------- \\
        const itemName = interaction.options.getString("name")
        const itemPrice = interaction.options.getString("price")
        const itemDescription = interaction.options.getString("description") || "No Description"
        const itemRarity = interaction.options.getString("rarity").value || "common"
        const itemType = interaction.options.getString("type") || "No type"
    // ----------------------- Item Data ----------------------- \\

        const newItemId = items.length + 1
        console.log(chalk.greenBright(`[+] La nueva ID del item sera: #${newItemId}`))
        /* console.log(`
            ID: ${newItemId}
            Item Name: ${itemName}
            Descripción: ${itemDescription}
            Precio: ${itemPrice}
            Rareza: ${itemRarity}
            Tipo: ${itemType}
        `) */

        //* Contenido del nuevo Item
        const newItem = {
            id: newItemId,
            item: itemName,
            description: itemDescription,
            price: itemPrice,
            rarity: itemRarity,
            type: itemType
        }

        console.log(newItem)

        const shopItemsPath = path.join(getBasePath() + "/shopitems.json")
        console.log(shopItemsPath)

        try{
            fs.readFileSync(shopItemsPath, "utf-8", (err, data) => {
                interaction.reply({ content: `[+] Leyendo contenido del archivo **${shopItemsPath}**...`, flags: MessageFlags.Ephemeral })

                const itemsArray = JSON.parse(data);
                const itemPush = itemsArray.push(newItem);
                    console.log(itemPush)
                    interaction.followUp({ content: `[+] Creando item a Añadir...`, flags: MessageFlags.Ephemeral })

                try {
                    fs.writeFileSync(shopItemsPath, JSON.stringify(itemsArray, null, 4), err => {
                        if (err) return console.error(chalk.redBright(`[!] Ha ocurrido un error al intentar escribir el archivo ${shopItemsPath}\n`) + err)
                    });
                    console.log(chalk.greenBright(`[+] Añadiendo item al archivo ./shopitems.js...`));
                    interaction.followUp({ content: `[+] Aplicando cambios al archivo **./shopitems.js**...`, flags: MessageFlags.Ephemeral })
                    interaction.followUp({ content: `[+] Nuevo Item añadido a la Tienda de manera Exitosa:\n*${itemName}*#**${newItemId}**`, flags: MessageFlags.Ephemeral })
                } catch (err) {
                    //! Mensaje de error al añadir item
                    console.error(chalk.redBright(`[!] Ha ocurrido un error al intentar añadir el item a la tienda\n`) + err)
                    return;
                }
            })
        } catch (err) {
            //! Mensaje de error al leer el archivo
            console.error(chalk.redBright(`[!] Ha ocurrido un error al intentar leer el archivo ${shopItemsPath}\n`) + err)
            return;
        }    
        
    }
        
}