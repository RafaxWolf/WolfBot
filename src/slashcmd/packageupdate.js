const { SlashCommandBuilder } = require("discord.js")
const { exec } = require('child_process')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("package-update")
    .setDescription("Package Update"),

    async run(client, interaction){

        interaction.reply({ content: '[+] Actualizando paquetes...', ephemeral: true })
        exec('npm update', (error, stdout, stderr) => {
            if(error){
                interaction.editReply({ content: `[!] Ha ocurrido un error al intentar actualizar los paquetes: ${error}`, ephemeral: true })
              return;
            }
            if(stderr){
                interaction.editReply({ content: `[!] Ha ocurrido un error al intentar ejecutar (npm update): ${stderr}`, ephemeral: true })
              return;
            } else {
                interaction.editReply({ content: `[+] Se han actualizado los paquetes correctamente\nPaquetes actualizados: ${stdout}!`, ephemeral: true })
            }
          }
        )

    }

}