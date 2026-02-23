const { SlashCommandBuilder, MessageFlags } = require("discord.js")
var CryptoJS = require("crypto-js")
var defaultPasswd = "Password";

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
        .setDescription("Método de encriptacion a usar (por defecto 'Base64')")
        .setChoices(
            { name: "Base64", value: "b64" },
            { name: "Hex", value: "hex" },
            { name: "Advanced Encryption Standard (AES)", value: "aes" },
        )
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("password")
        .setDescription("La contraseña para encriptar el mensaje (por defecto: 'Password')")
        .setMinLength(5)
        .setMaxLength(30)
    ),

    async run(client, interaction){
        const message = interaction.options.getString("text")
        const password = interaction.options.getString("password") || defaultPasswd
        const encryptMethod = interaction.options.get("method").value

        /**
         * Encrypt a text with a password and with a different methods
         * @param {string} text Text to Encrypt
         * @param {string} passwd Password of the Encryted Text
         * @param {string} method Method of Encryption
         */
        function encrypt(text,passwd,method){
            switch (method){
                case "b64":
                    var ciphertext = CryptoJS.enc.Base64(text).toString();
                    interaction.reply({ content: `Mensaje Encriptado:\n${ciphertext}`, flags: MessageFlags.Ephemeral })
                    break;
                
                case "aes":
                    var ciphertext = CryptoJS.AES.encrypt(text, passwd).toString();
                    interaction.reply({ content: `Mensaje Encriptado:\n${ciphertext}\nContraseña: ${passwd}`, flags: MessageFlags.Ephemeral })
                    break;

                case "hex":
                    var ciphertext = CryptoJS.enc.Hex(text).toString();
                    interaction.reply({ content: `Mensaje Encriptado:\n${ciphertext}`, flags: MessageFlags.Ephemeral })
                    break;

                case _:
                    interaction.reply({ content: "[!] Error al encriptar.", flags: MessageFlags.Ephemeral })
                    break;
            }
        }

        if(encryptMethod){
            interaction.reply({ content: `Método de Encriptacion Utilizado: ${encryptMethod}`, flags: MessageFlags.Ephemeral })
            encrypt(message,password,encryptMethod)
        } else {
            return;
        }

    }
        
}