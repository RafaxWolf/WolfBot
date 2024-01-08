const items = require("../../shopItems");
const inventory = require('../../Schema/inventory-schema');
const economia = require('../../Schema/economia-schema')

module.exports = {
  name: "shop",
  alias: ["tienda"],

async execute (client, message, args){
    const q = items
      .map((value, index) => {
      return `**${index + 1})** ${value.item}*#${value.Id}*\nDescripción: \`*${value.description}*\`\nPrecio: **${value.price}** Wolfcoins!`
        }).join(`\n`)

    const shopping = await message.channel.send(`
      ¡Bienvenido a la tienda ${message.author}!\nPara ver el listado de items que dispone actualmente la tienda, Use: **w!shop list**\nPara comprar un item de la tienda, Use: **w!shop buy <Item>**`)

    if (items.length === 0) return message.reply({ content: 'No hay nada en la tienda!' });
        if(args[1]) {
          const shopping = null;
        }
    switch (args[0]) {
      case 'list':
        shopping.edit(`Objetos actualmente disponibles en la tienda:\n${q}`)
      break
      case 'lista': 
        shopping.edit(`Objetos actualmente disponibles en la tienda:\n${q}`)
      break
      case 'buy':
        let balanceData = await economia.findOne({ userID: message.author.id, guildID: message.guild.id })
        if(!args[1]) return message.author.send("❌ | **Syntax Error** | ❌\nPara comprar un item debes poner su nombre o ID!")
    
        const itemToBuy = args[1];
        const validItem = !!items.find(
             (val) =>  val.item === itemToBuy
        )
          if (!validItem)
            return shopping.edit("❌ | El item que has querido comprar no se encuentra disponible en la tienda!");
    
            const itemPrice = items.find((val) => val.item === itemToBuy).price
    
            const userBalance = balanceData.dinero
    
            if (userBalance < itemPrice)
             return shopping.edit(
               `❌ | Solo tienes ${userBalance} Wolfcoins y el precio de este item es ${itemPrice} Wolfcoins!`
                );
              
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
            shopping.edit(`${message.author} Ha comprado: ${itemToBuy} por ${itemPrice} Wolfcoins`)
            await economia.findOneAndUpdate({ userID: message.author.id }, { dinero: userBalance - itemPrice })
        })
      break 
      case 'comprar':
        if(!args[1]) return message.author.send("❌ | **Syntax Error** | ❌\nPara comprar un item debes poner su nombre o ID!")

        if(shopping){
          msg => msg.delete()
        }
       
        if (userBalance < itemPrice)
        return message.author.send(
          `❌ | Solo tienes ${userBalance} Wolfcoins y el precio de este item es ${itemPrice} Wolfcoins!`
        );
        
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
          shopping.edit(`${message.author} Ha comprado: ${itemToBuy} por ${itemPrice} Wolfcoins`)
        })
      break
    }


 }

}