const { SlashCommandBuilder } = require("discord.js")
const economia = require("../Schema/economia-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("A apostar!")
    .addSubcommand(subcommand =>
        subcommand
        .setName("play")
        .setDescription("Jugar a la ruleta")
        .addStringOption(option =>
            option
            .setName('elegir')
            .setDescription('Elige a que vas a apostar!')
            .addChoices(
                { name: 'Numero', value: 'play_numb' },
                { name: 'Rojo', value: 'play_red' },
                { name: 'Negro', value: 'play_black' },
                { name: 'Par', value: 'play_par' },
                { name: 'ImPar', value: 'play_impar' },
                { name: '1-18', value: 'first_half' },
                { name: '19-36', value: 'second_half' },
                { name: '1st 12', value: 'first_twelve' },
                { name: '2nd 12', value: 'second_twelve' },
                { name: '3rd 12', value: 'third_twelve' },
            )
            .setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
        .setName('gift')
       .setDescription('Donar fichas a un usuario')
       .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Usuario a donar')
            )
        .addNumberOption(option => 
            option
            .setName("number")
            .setDescription("asd")))
    .setDMPermission(false),

    async run(client, interaction){
        const userGift = interaction.options.getUser("user")
        const selectedPlay = interaction.options.get("elegir").value
    var Numbs = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
         "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
          "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
           "31", "32", "33", "34", "35", "36"
    ]
    var Par = [
        "2", "4", "6", "8", "10",
         "12", "14", "16", "18", "20",
          "22", "24", "26", "28", "30",
           "32", "34", "36"
    ]
    var ImPar = [
        "1", "3", "5", "7", "9",
         "11", "13", "15", "17", "19",
          "21", "23", "25", "27", "29",
           "31", "33", "35"
    ]
    var Red = [
        "1", "3", "5", "7", "9",
         "12", "14", "16", "18", "19",
          "21", "23", "25", "27",
           "30", "32", "34", "36"
    ]
    var Black = [
        "2", "4", "6", "8", "10",
         "11", "13", "15", "17",
          "20", "22", "24", "26", "28", "29",
           "31", "33", "35"
    ]

    interaction.reply({ content: `selected: ${selectedPlay}`, ephemeral: true })

    }
        
}

