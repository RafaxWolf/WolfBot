const enocomia = require("../Schema/economia-schema")
const xp = require("../Schema/xp-schema")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboards")
    .setDescription("All server LeaderBoards")
    .addStringOption(option => 
        option
        .setName("select")
        .setDescription("Select the LeaderBoard to see")
        .setChoices(
            { name: "Economy", value: "money-leader" },
            { name: "Experience", value: "xp-leader" },
            //{ name: "", value: "" },
        )
        .setRequired(true)),

    async run(client, interaction){
      
        const leaderSelected = interaction.options.getString("select")

        interaction.reply({ content: `${leaderSelected}`, ephemeral: true })

        if(leaderSelected === "money-leader"){
            
            //let moneyLeaderboard = await economy.find().sort([["Money","descending"]]).limit(10)
            interaction.update({ content: "asdsadfg", ephemeral: true })
        }
        if(leaderSelected === "xp-leader"){
            interaction.update({ content: "qwerty", ephemeral: true })
        }

    }
        
}