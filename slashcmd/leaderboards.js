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
        )),

    async run(client, interaction){
      
    }
        
}