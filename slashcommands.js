const fs = require("fs")
const { REST, Routes } = require("discord.js")
require("dotenv").config();

const commands = [];
const slashcommandsFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'));

for (const file of slashcommandsFiles) {
    const slash = require(`./slashcmd/${file}`)
    commands.push(slash.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENTID), 
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    }catch(e) {
        console.error(e)
    }
})();