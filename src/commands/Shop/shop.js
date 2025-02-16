// ----------------- Librerias -----------------
const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

// ---------------------- Modelos -------------------------
const inventory = require('../../Schema/inventory-schema');
const economia = require('../../Schema/economia-schema');

// --------- Items de la tienda ---------
const items = require("../../shopitems");


module.exports = {
  name: "shop",
  alias: ["tienda"],

async execute (client, message, args){
    const q = items
      .map((value, index) => {
      return `**${index + 1})** ${value.item}*#${value.id}*
      Descripción:
      *\`${value.description}\`*
      Precio: **${value.price}** Wolfcoins!`
      }).join(`\n\n`)

        const shoppingEmbed = new EmbedBuilder() //* Embed de la tienda
        .setTitle(`¡Bienvenido a la Tienda ${message.author.username}!`)
        .setAuthor({ name: "Tienda", iconURL: "https://imgur.com/8OYBVIJ.png" })
        .setColor("Gold")
        .setTimestamp()
        .addFields(
          { 
            name: "Para revisar los items que disponibles actualmente en la tienda usa:",
            value: "**\`w!shop list\`**",
          },
          {
            name: "Para comprar items de la tienda usa:",
            value: "**\`w!shop buy <Nombre del item>\`**"
          }
        )


      ////const shopping = await message.channel.send(`
      ////¡Bienvenido a la tienda ${message.author}!\nPara ver el listado de items que dispone actualmente la tienda, Use: **w!shop list**\nPara comprar un item de la tienda, Use: **w!shop buy <Item>**`
      ////) 

      const shopping = await message.channel.send({ embeds: [shoppingEmbed] }) //* Envía el mensaje de ayuda de la tienda

      //setTimeout(() => {
      //    shopping.delete().catch((error) => {
      //      if(error){
      //        console.log(chalk.redBright(`[!] Ha ocurrido al intentar eliminar el mensaje de la tienda.\nAhora esto puede ser debido a que el mensaje fue eliminado manualmente o por un error en el bot.`))
      //      }
      //    })
      //}, 20000)

    if (items.length === 0) return message.reply({ content: '[!] Actualmente la tienda se encuentra vacia!' });
        if(args[1]) {
          const shopping = null;
        }
    switch (args[0]) {
      case 'list' || 'lista': //? Comando para ver los items disponibles en la tienda
      const shoplistEmbed = new EmbedBuilder() //! Embed de la lista de items
      .setAuthor({ name: "Tienda", iconURL: "https://imgur.com/8OYBVIJ.png" }) //* Icono de la tienda
      .setTitle("Items disponibles en la tienda") //* Título del embed
      .setDescription(q) //* Descripción del embed con los items disponibles
      .setColor("Gold") //* Color del embed
      .setFooter({ text: "Para comprar un item usa: w!shop buy <Item>" }) //* Explicativo de como comprar un item
      .setTimestamp() //* Fecha del embed

      shopping.edit({ embeds: [shoplistEmbed] }) //* Edita el mensaje para mostrar los items disponibles

      ////shopping.edit(`Objetos actualmente disponibles en la tienda:\n` + q)
      break
      case 'buy' || 'comprar': //? Comando para comprar un item de la tienda
        let balanceData = await economia.findOne({ userID: message.author.id, guildID: message.guild.id })
        if(!args[1]) return message.author.send("❌ | **Syntax Error** | ❌\nPara comprar un item debes poner su nombre o ID!")
    
        const itemToBuy = args[1];
        const validItem = !!items.find(
             (val) =>  val.item === itemToBuy || val.id === itemToBuy //* Si el item es igual al item a comprar o el id es igual al item a comprar
        )
          if (!validItem) //* Verifica si el item es valido
            return shopping.edit("❌ | El item que has querido comprar no se encuentra disponible en la tienda!");
    
            const itemPrice = items.find((val) => val.item === itemToBuy || val.id === itemToBuy).price //* Comprueba el precio del item

            if(itemPrice === "Unknown") return shopping.edit("❌ | Este item no tiene un precio") //* Verifica si el item tiene un precio asignado
    
            const userBalance = balanceData.dinero //* Obtiene el balance del usuario
    
            if (userBalance < itemPrice) //* Verifica si el usuario tiene suficiente dinero para comprar el item
             return shopping.edit(
               `❌ | No puedes comprar el item **\`${itemToBuy}\`** \nDebido a que tienes **\`${userBalance} Wolfcoins\`** y el precio de este item es de **\`${itemPrice} Wolfcoins\`**!`
                );
              
              //* Parámetros necesarios
              const params = {
                guildID: message.guild.id,
                userID: message.author.id,
              };

            inventory.findOne(params, async (err, data) => {
              if (data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);

                if (!hasItem) {
                  data.Inventory[itemToBuy] = 1;
                } else {
                  data.Inventory[itemToBuy]++;
                }

                console.log(data);

                await inventory.findOneAndUpdate(params, data);

              } else {
                new inventory({
                  userID: message.author.id,
                  guildID: message.guild.id,
                  Inventory: {
                    [itemToBuy]: 1,
                  },
                    }).save();
                }

            shopping.edit(`${message.author} Ha comprado: ${itemToBuy} por ${itemPrice} Wolfcoins`) //* Edita el mensaje para mostrar que el usuario ha comprado el item

            await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: userBalance - itemPrice }) //* Resta las Wolfcoins del usuario al comprar el item
        })
      break 
    }

 }

}