const { SlashCommandBuilder } = require("discord.js")
const Cryptr = require("cryptr")

var CryptoJS = require("crypto-js")

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
        .setName("method")
        .setDescription("Método de encriptacion a usar (por defecto 'Hex')")
        .setChoices(
            { name: "Base64", value: "b64" },
            { name: "Hexadecimal", value: "hex" },
            { name: "Advanced Encryption Standard (AES)", value: "aes" },
        )
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("password")
        .setDescription("La contraseña para encriptar el mensaje (por defecto 'Password')")
        .setMinLength(5)
        .setMaxLength(30)
    ),

    async run(client, interaction){
      
        const text2Encrypt = interaction.options.getString("text")
        const password4Encrypt = interaction.options.getString("password")
        const encryptionMethod = interaction.options.get("method").value

        if(encryptionMethod){
            interaction.reply({ content: `Metodo de Encriptación Utilizado: ${encryptionMethod}`, ephemeral: true })
        }else {
            return;
        }

        if(encryptionMethod === "aes" && !password4Encrypt){
            var ciphertext = CryptoJS.AES.encrypt(`${text2Encrypt}`, defaultPasswd)
            interaction.reply({ content: `Mensaje Encriptado:\n${ciphertext}`, ephemeral: true })

        } else if(encryptionMethod === "aes" && password4Encrypt){
            var ciphertext = CryptoJS.AES.encrypt(`${text2Encrypt}`, password4Encrypt)
            interaction.reply({ content: `Mensaje Encriptado:\n${ciphertext}`, ephemeral: true })
        }

        if(encryptionMethod === "b64" && !password4Encrypt){

        } else if(encryptionMethod === "b64" && password4Encrypt){
            
        }

    }
        
}