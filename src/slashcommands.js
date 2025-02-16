const fs = require("fs")
const path = require("path")
const { REST, Routes } = require("discord.js")
const chalk = require("chalk")
require("dotenv").config();

const commands = [];

//* Obtener ruta de /slashcmd
const folderDir = path.resolve(__dirname)
const slashCommandsPath = path.join(folderDir, "slashcmd")

//* Verificar si la carpeta /slashcmd existe
if (!fs.existsSync(slashCommandsPath)) {
    console.error(chalk.redBright("❌ | La carpeta /slashcmd no existe!"))
    process.exit(1);
}

//* Leer archivos de /slashcmd
const slashcommandsFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

console.log(chalk.yellowBright(`Loading Slash Commands from: ${slashCommandsPath}...`))

for (const file of slashcommandsFiles) {
    try {
        const slash = require(path.join(slashCommandsPath, file));
        commands.push(slash.data.toJSON());
        console.log(chalk.greenBright(`✅ | ${file} Loaded Successfully!`))
    } catch (error) {
        console.error(chalk.redBright(`❌ | Error loading ${file}:\n${error}`))
    }
}

const rest = new REST().setToken(process.env.TOKEN);

//* Cargador de Slash Commands
(async () => {
    try{
        console.log(chalk.blueBright(`Started refreshing ${commands.length} application (/) commands.`))
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENTID), 
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    }catch(e) {
        console.error(chalk.red("❌ | Error trying to reload application (/) commands:\n"), e)
    }
})();