const economia = require('../../Schema/economia-schema');

module.exports = {
  name: "slots",
  alias: ["tragamonedas", "tragaperras"],

  async execute(client, message, args) {
    //if (message.channel.id !== "983166704500744243") return message.author.send("[!] Este comando está restringido y solo puede usarse en el canal <#983166704500744243>");

    let datos = await economia.findOne({ userID: message.author.id });
    if (!datos) {
      let nuevosdatos = new economia({
        userID: message.author.id,
        dinero: 0,
        dinerobanco: 0
      });
      await nuevosdatos.save();
      return message.channel.send("Tus datos están siendo guardados, use nuevamente el comando.");
    }

    //let dineronuestro = datos.dinero;
    //let randomMoney = Math.floor(Math.random() * 200) + 100;

    const emojis = {
      '1': ':mouse:',
      '2': ':strawberry:',
      '3': ':cherries:',
      '4': ':sunglasses:',
      '5': ':seven:',
    };

    let randomNumbers = '';
    let matchCount = 0;

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      randomNumbers += randomNumber.toString();
    }

    const resultWithEmojis = randomNumbers.split('').map(num => emojis[num]).join('');

    const sentMessage = await message.channel.send(`Slots: ${resultWithEmojis}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (randomNumbers.split('').some((val, i, arr) => val === arr[i + 1] && val === arr[i + 2])) {
      matchCount++;
    }

    if (matchCount > 0) {
      message.channel.send("asd WON! **W.I.P** \n*WolfBot Signature.*");
    } else {
      message.channel.send("dsa LOSE! **W.I.P** \n*WolfBot Signature.*");
    }
  }
};