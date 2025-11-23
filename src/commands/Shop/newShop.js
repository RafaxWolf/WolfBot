// Librerías
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const getBasePath = require('../../utils/getBasePath')

// Modelos
const inventory = require('../../Schema/inventory-schema');
const economia = require('../../Schema/economia-schema');

module.exports = {
   name: "newshop",
   alias: ["nuevaTienda"],
   authOnly: true,
async execute (client, message, args){

    message.channel.send("Abriendo tienda...")

    const shopData = fs.readFileSync(getBasePath() + "/shopitems.json");
    const items = JSON.parse(shopData);

    console.log(items)
    if (items.length === 0) return message.reply({ content: '[!] Actualmente la tienda se encuentra vacía!' });

    const q = items.map((value, index) => {
        return `**${index + 1})** ${value.item} *#${value.id}*
        Descripción:
        *\`${value.description}\`*
        Rareza: **${value.rarity}** | Tipo: **${value.type}**
        Precio: **${value.price}** Wolfcoins!`
    }).join(`\n\n`)

    const shoplistEmbed = new EmbedBuilder() //! Embed de la lista de items
    .setAuthor({ name: "Tienda", iconURL: "https://imgur.com/8OYBVIJ.png" })
    .setTitle("Items disponibles en la tienda")
    .setDescription(q)
    .setColor("Gold")
    .setFooter({ text: "Para comprar un item usa: w!shop buy <ItemName>" })
    .setTimestamp()

    message.channel.send({ embeds: [shoplistEmbed] })

 }

}