const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "imagesembed",
    alias: ["ie"],
  
execute (client, message, args){
  
/*     const embed1 = new EmbedBuilder()
    .setTitle("Workshop")
    .setColor("Blue")
    .addFields(
        { name: "Art 1", value: "Autor 1", inline: true },
        { name: "Art 2", value: "Autor 2", inline: true },
        { name: "Art 3", value: "Autor 3", inline: true },
    )
    .setTimestamp()

        embed1.setImage('https://imgur.com/GEn3hLb.png')
        embed2.setImage('https://imgur.com/dhjl9kZ.png')
        embed3.setImage('https://imgur.com/PJOvmjK.png') */

        const embed1 = new EmbedBuilder()
        .setTitle("Workshop")
        .setColor("Blue")
        .addFields({ name: "Art 1", value: "Autor 1" })
        .setImage('https://imgur.com/GEn3hLb.png')
        .setURL('https://store.steampowered.com/')

        const embed2 = new EmbedBuilder()
        .addFields({ name: "Art 2", value: "Autor 2" })
        .setImage('https://imgur.com/dhjl9kZ.png')
        .setColor("Blue")
        .setURL('https://store.steampowered.com/')

        const embed3 = new EmbedBuilder()
        .addFields({ name: "Art 3", value: "Autor 3" })
        .setImage('https://imgur.com/PJOvmjK.png')
        .setColor("Blue")
        .setURL('https://store.steampowered.com/')

        const embed4 = new EmbedBuilder()
        .setImage('https://imgur.com/wTZ8MAZ.png')
        .setColor("Blue")
        .setURL('https://store.steampowered.com/')

    message.channel.send({ embeds: [embed1, embed2, embed3, embed4] })
  
  }
  
}