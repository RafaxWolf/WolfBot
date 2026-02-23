const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js")
const wait = require('node:timers/promises').setTimeout;

const getRandomLine = require('../utils/getRandomLine')
const { faker } = require("@faker-js/faker")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("Hackear a un usuario del servidor ☠")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Usuario al cual hackear")
        .setRequired(true)),

    async run(client, interaction){
      const user = interaction.options.getUser("user")

      const randomIp = faker.internet.ipv4()
      const randomMail = faker.internet.exampleEmail({ firstName: user.username })
      const randomCounty = faker.location.country()

      var devices = [
        "Samsung Galaxy S23",
        "Notebook",
        "PC",
        "iPhone 14",
        "iPhone 15",
        "iPhone X",
        "MacBook Pro",
        "Mac Pro"
      ]

      var randomDevice = Math.floor(Math.random()*(devices.length))


      // Cambiar ruta por la del archivo dodne esten las contraseñas o WordList
      const file = "../../Wordlists/rockyou.txt"
      const randomPasswd = getRandomLine(file)

      if(randomPasswd === null) {
        console.error("[!] Error: No se ha podido seleccionar ninguna contraseña deñ archivo.")
        return;
      }

      const hacknetEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Hacknet OS', iconURL: 'https://i.imgur.com/xHqbSsw.png' })
      .setTitle(`Información recolectada de: ${user.user}`)
      .setColor("Orange")
      .setFields(
        { name: "Usuario:", value: `${user.username}` },
        { name: "Ip:", value: `\`${randomIp}\``, inline: true },
        { name: "Dispositivo hackeado:", value: `\`${devices[randomDevice]}\``, inline: true },
        { name: "Correo Electrónico:", value: `\`${randomMail}\``, inline: true },
        { name: "Contraseña mas utilizada:", value: `\`${randomPasswd}\``, inline: true },
        { name: "Pais de origen:", value: `\`${randomCounty}\``, inline: true }
      )
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

      await interaction.deferReply();
      await wait(5000);
      await interaction.editReply({ embeds: [hacknetEmbed], flags: MessageFlags.Ephemeral })
      
    }
        
}