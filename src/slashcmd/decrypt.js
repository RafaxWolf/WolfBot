const { SlashCommandBuilder, MessageFlags } = require("discord.js")
var CryptoJS = require("crypto-js")
var defaultPasswd = "Password";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("decrypt")
    .setDescription("Desencripta un mensaje encriptado")
    .addStringOption(option =>
        option
        .setName("text")
        .setDescription("Texto o mensaje a desencriptar")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("method")
        .setDescription("Método de encriptacion usado (por defecto 'Base64')")
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
        .setDescription("La contraseña para desencriptar el mensaje (por defecto: 'Password')")
        .setMinLength(5)
        .setMaxLength(30)
    ),

    async run(client, interaction){
        const message = interaction.options.getString("text")
        const password = interaction.options.getString("password") || defaultPasswd
        const encryptMethod = interaction.options.get("method").value

        /**
         * Decrypt a text with a password and with a different methods
         * @param {string} text Text to Encrypt
         * @param {string} passwd Password of the Encryted Text
         * @param {string} method Method of Encryption
         */
        function decrypt(text,passwd,method){
            switch (method){
                case "b64":
                    var ciphertext = CryptoJS.enc.Utf8(text).toString();
                    interaction.reply({ content: `Mensaje Desencriptado:\n${ciphertext}`, flags: MessageFlags.Ephemeral })
                    break;
                
                case "aes":
                    var ciphertext = CryptoJS.AES.decrypt(text, passwd).toString();
                    interaction.reply({ content: `Mensaje Desencriptado:\n${ciphertext}\nContraseña: ${passwd}`, flags: MessageFlags.Ephemeral })
                    break;

                case "hex":
                    var ciphertext = CryptoJS.enc.Utf8(text).toString();
                    interaction.reply({ content: `Mensaje Desencriptado:\n${ciphertext}`, flags: MessageFlags.Ephemeral })
                    break;

                case _:
                    interaction.reply({ content: "[!] Error al desencriptar.", flags: MessageFlags.Ephemeral })
                    break;
            }
        }

        if(encryptMethod){
            //interaction.reply({ content: `Método de Encriptacion Utilizado: ${encryptMethod}`, flags: MessageFlags.Ephemeral })
            decrypt(message,password,encryptMethod)
        } else {
            return;
        }

    }
        
}