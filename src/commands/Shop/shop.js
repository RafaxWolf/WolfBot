// ----------------- Librerías -----------------
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
      Rareza: **${value.rarity}** | Tipo: **${value.type}**
      Descripción:
      *\`${value.description}\`*
      Precio: **${value.price}** Wolfcoins!`
      }).join(`\n\n`)

    if (items.length === 0) return message.reply({ content: '[!] Actualmente la tienda se encuentra vacía!' });

    switch (args[0]) {
      case 'list' || 'lista': //? Comando para ver los items disponibles en la tienda
      const shoplistEmbed = new EmbedBuilder() //! Embed de la lista de items
      .setAuthor({ name: "Tienda", iconURL: "https://imgur.com/8OYBVIJ.png" }) //* Icono de la tienda
      .setTitle("Items disponibles en la tienda") //* Título del embed
      .setDescription(q) //* Descripción del embed con los items disponibles
      .setColor("Gold") //* Color del embed
      .setFooter({ text: "Para comprar un item usa: w!shop buy <ItemName>" }) //* Explicativo de como comprar un item
      .setTimestamp() //* Fecha del embed

      message.channel.send({ embeds: [shoplistEmbed] }) //* Edita el mensaje para mostrar los items disponibles

      ////shopping.edit(`Objetos actualmente disponibles en la tienda:\n` + q)
      break

      case 'buy' || 'comprar': //? Comando para comprar un item de la tienda
        let balanceData = await economia.findOne({ userID: message.author.id, guildID: message.guild.id })
        if(!args[1]) return message.author.send("❌ | **Syntax Error** | ❌\nPara comprar un item debes poner su nombre o ID!")
          if (!balanceData) {
            return message.channel.send("❌ | No tienes una cuenta de Wolfcoins, por favor usa el comando **\`w!bal\`** para crear una cuenta!")
          }

        const itemToBuy = args[1].toLowerCase() && args[1].replace("#", "") //* Obtiene el item a comprar correctamente
        const validItem = !!items.find(
             (val) =>  val.item === itemToBuy || val.id === itemToBuy //* Si el item es igual al item a comprar o el id es igual al item a comprar
        )

          if (!validItem) //* Verifica si el item es valido
            return message.channel.send("❌ | El item que has querido comprar no se encuentra disponible en la tienda!");
    
            const itemPrice = items.find((val) => val.item === itemToBuy || val.id === itemToBuy).price //* Comprueba el precio del item

            if(itemPrice === "Unknown") return message.channel.send("❌ | Este item no tiene un precio") //* Verifica si el item tiene un precio asignado

            const itemName = items.find((val) => val.id === itemToBuy).item //* Obtiene el nombre del item a comprar
    
            const userBalance = balanceData.dinero //* Obtiene el balance del usuario
    
            if (userBalance < itemPrice) //* Verifica si el usuario tiene suficiente dinero para comprar el item
             return message.channel.send(
               `❌ | No puedes comprar el item **\`${itemToBuy}\`** \nDebido a que tienes **\`${userBalance} Wolfcoins\`** y el precio de este item es de **\`${itemPrice} Wolfcoins\`**!`
                );

              //* Parámetros necesarios
              const params = {
                guildID: message.guild.id,
                userID: message.author.id,
              };

            const data = await inventory.findOne(params); //* Busca si el usuario ya tiene un inventario
            if (data) {
              const hasItem = Object.keys(data.Inventory).includes(itemName); //* Verifica si el usuario ya tiene el item

              if (!hasItem) {
                data.Inventory[itemName] = 1;
              } else {
                data.Inventory[itemName]++;
              }

              console.log(data);

              await inventory.findOneAndUpdate(params, data);
            } else {
              await new inventory({
                userID: message.author.id,
                guildID: message.guild.id,
                Inventory: {
                  [itemName]: 1,
                },
              }).save();
            }

            message.channel.send(`${message.author} Ha comprado: **${itemName}** por *${itemPrice} Wolfcoins*`) //* Edita el mensaje para mostrar que el usuario ha comprado el item

            await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: userBalance - itemPrice }) //* Resta las Wolfcoins del usuario al comprar el item
      break

      case 'help' || 'ayuda': //? Comando para ver la ayuda de la tienda
      default:
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
            value: "**\`w!shop buy <Nombre del item o su ID>\`**"
          }
        )
        const shopHelp = message.channel.send({ embeds: [shoppingEmbed] }) //* Envía el mensaje de ayuda de la tienda

        setTimeout(() => {
          shopHelp.delete().catch(console.error)
        }, 5000)
    }

 }

}