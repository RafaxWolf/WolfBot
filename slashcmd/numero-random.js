const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("numerorandom")
    .setDescription("Numeros aleatorios con un minimo y un maximo custom!")
    .addNumberOption(option => 
        option
            .setName("input1")
            .setDescription("Numero mas bajo")
            .setRequired(true)
        )
    .addNumberOption(option => 
            option
                .setName("input2")
                .setDescription("Numero mas alto")
                .setRequired(true)
            ),
    async run(client, interaction){
      const n1 = interaction.options.getNumber("input1")
      const n2 = interaction.options.getNumber("input2")

      var random = Math.floor(Math.random() * n2) + n1

      interaction.reply({ content: `El numero es: ${random}` })
    }
        
}