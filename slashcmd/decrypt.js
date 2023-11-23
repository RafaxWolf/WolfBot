const { SlashCommandBuilder } = require("discord.js")
const Cryptr = require("cryptr")

var defaultPasswd = 'Password'

module.exports = {
    data: new SlashCommandBuilder()
    .setName("decrypt")
    .setDescription("Desencripta cualquier mensaje encriptado")
    .addStringOption(option =>
        option
        .setName("text")
        .setDescription("Texto o mensaje a desencriptar")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("password")
        .setDescription("La contraseña para desencriptar el mensaje")
        .setMinLength(5)
        .setMaxLength(30)
    ),

    async run(client, interaction){
        const text2eDecrypt = interaction.options.getString("text")
        const password4Decrypt = interaction.options.getString("password")

        if(password4Decrypt){
            try{
                const cryptr = new Cryptr(password4Decrypt)
                const decryptedText = cryptr.decrypt(text2eDecrypt)                
                interaction.reply({content: decryptedText, ephemeral: true})
            } catch (error) {
                interaction.reply({content: "[!] Ha ocurrido un error al intentar desencriptar el mensaje!", ephemeral: true})
            }            
        }else {
            const cryptr = new Cryptr(defaultPasswd)
            const decryptedText = cryptr.decrypt(text2eDecrypt)
                interaction.reply({content: decryptedText, ephemeral: true})            

            
        }
    }
        
}