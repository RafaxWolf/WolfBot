const { SlashCommandBuilder } = require("discord.js")
const Cryptr = require("cryptr")

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
        .setDescription("La contraseña para encriptar el mensaje")
        .setMinLength(5)
        .setMaxLength(30)
    ),

    async run(client, interaction){
      
        const text2Encrypt = interaction.options.getString("text")
        const password4Encrypt = interaction.options.getString("password")
        
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