const { SlashCommandBuilder } = require("discord.js")
const Cryptr = require("cryptr")

var AES = require("crypto-js/aes")

var defaultPasswd = 'Password'

module.exports = {
    data: new SlashCommandBuilder()
    .setName("encrypt")
    .setDescription("Encripta el mensaje que quieras")
    .addStringOption(option =>
        option
        .setName("text")
        .setDescription("Texto o mensaje a encriptar")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("password")
        .setDescription("La contraseña para encriptar el mensaje (por defecto 'Password')")
        .setMinLength(5)
        .setMaxLength(30)
    )
    .addStringOption(option =>
        option
        .setName("method")
        .setDescription("Metodo de encriptacion a usar (por defecto 'Hex')")
        .setChoices(
            { name: "Base64", value: "b64" },
            { name: "Hexadecimal", value: "hex" },
            { name: "Advanced Encryption Standard (AES)", value: "aes" },
        )
    ),

    async run(client, interaction){
      
        const text2Encrypt = interaction.options.getString("text")
        const password4Encrypt = interaction.options.getString("password")
        const encryptionMethod = interaction.options.get("method").value

        if(encryptionMethod){
            interaction.reply({ content: `${encryptionMethod}`, ephemeral: true })
        }else {
            return;
        }

        if(password4Encrypt){
            const cryptr = new Cryptr(password4Encrypt)
            const encryptedText = cryptr.encrypt(text2Encrypt)
            interaction.reply({ content: `${encryptedText}`, ephemeral: true })
        }else {
            const cryptr = new Cryptr(defaultPasswd)
            const encryptedText = cryptr.encrypt(text2Encrypt)
            interaction.reply({ content: `${encryptedText}`, ephemeral: true })
        }
    }
        
}