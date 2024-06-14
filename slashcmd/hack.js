const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("Hackear a un usuario del servidor ☠")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Usuario al cual hackear")
        .setRequired(true))
        .setDMPermission(false),

    async run(client, interaction){
      const user = interaction.options.getUser("user")

      var ips = [
      "37.219.151.49",
      "92.79.101.173",
      "8.113.244.227",
      "213.149.191.3",
      "58.11.229.207",
      "202.113.22.75",
      "253.94.112.26",
      "142.65.141.114",
      "215.154.143.73",
      "43.107.188.229",
      "218.207.84.76",
      "235.39.59.169",
      "72.225.112.141",
      "119.184.125.168",
      "129.214.177.125",
      "19.53.85.202",
      "137.212.54.54",
      "151.156.186.26",
      "47.36.80.98"
      ]

        var randomIp = Math.floor(Math.random()*(ips.length))

        var correos = [
          `${user.username}@gmail.com`,
          `${user.username}@hotmail.com`,
          `${user.username}@yahoo.com`,
          `${user.username}@outlook.com`
        ]
                    
        var randomMail = Math.floor(Math.random()*(correos.length))

        var devices = [
          "Samsung Galaxy A10",
          "Samsung Galaxy A04S",
          "Notebook",
          "PC",
          "iPhone 14",
          "iPhone X",
          "MacBook Pro",
          "Mac Pro"
          ]

          var randomDevice = Math.floor(Math.random()*(devices.length))

          var pais = [
            "Chile", "Argentina", "Bolivia", "Venezuela", "Brazil", "Peru", "Estados Unidos", "Mexico", "Canada", "España", "Panama", "Colombia", "Rusia", "China", "Japón", "Alemania", "Francia"
          ]

          var randomPais = Math.floor(Math.random()*(pais.length))

          var password = [
            "0000",
            "123456",
            "qwerty",
            "qwerty123",
            "password123",
            "password",
            "picopalquelee",
            "colocolo",
            "belén",
            "hola123",
            "chupalo",
            "Holahola",
            "123456789",
            "1234567890",
            "constanza",
            "110110jp",
            "fuckyou",
            "teemonoobchamp",
            "admin",
            "P@$$w0rd!",
            "Password",
            "user12345"
          ]

          var randomPassword = Math.floor(Math.random()*(password.length))

      const hacknetEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Hacknet OS', iconURL: 'https://i.imgur.com/xHqbSsw.png' })
      .setTitle(`Información recolectada de: ${user.user}`)
      .setColor("Orange")
      .setFields(
        { name: "Usuario:", value: `${user.username}` },
        { name: "Ip:", value: `\`${ips[randomIp]}\``, inline: true },
        { name: "Correo Electrónico Principal:", value: `\`${correos[randomMail]}\``, inline: true },
        { name: "Contraseña mas usada:", value: `\`${password[randomPassword]}\``, inline: true },
        { name: "Dispositivo hackeado:", value: `\`${devices[randomDevice]}\``, inline: true },
        { name: "Pais de origen:", value: `\`${pais[randomPais]}\``, inline: true }
      )
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

      await interaction.deferReply();
      await wait(5000);
      await interaction.editReply({ embeds: [hacknetEmbed], ephemeral: true })
      
    }
        
}