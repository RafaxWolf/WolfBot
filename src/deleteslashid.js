const chalk = require('chalk');
const { REST, Routes } = require('discord.js');
require("dotenv").config();

if (!process.env.TOKEN || !process.env.CLIENTID) {
    console.error(chalk.bgRed("[!] Falta el TOKEN o el CLIENTID en las variables de entorno."));
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

const args = process.argv.slice(2)

function isValidDiscordID(id){
	return /^\d{18,19}$/.test(id);
}

	if(args.length > 0){
		const slashcmdid = args[0];

		if(!isValidDiscordID(slashcmdid)){
			console.error(chalk.red("[!] La ID proporcionada no es valida!. La ID debe de contener entre 18 y 19 dígitos en total!"))
			process.exit(1)
		}

		rest.delete(Routes.applicationCommand(process.env.CLIENTID, slashcmdid))
		.then(() => console.log(chalk.greenBright(`[+] Has eliminado el Slash Command con ID: ${slashcmdid} Exitosamente!`)))
		.catch(error => {
			if(error.status === 404 && error.code === 10063){
				console.error(chalk.red(`[!] El Slash Command asociado a la ID: ${slashcmdid} no existe!`))
				process.exit(1)
			} else {
				console.error(chalk.red("[!] Error al intentar eliminar el Slash Command!"), error)
			}
		});
	} else {
		console.error(chalk.red("[!] No has proporcionado una ID valida de un Slash Command!\n") + "Sintaxis correcta: node deleteslashid.js <ID>")
		process.exit(1);
	}