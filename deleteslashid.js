const { REST, Routes } = require('discord.js');
require("dotenv").config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.delete(Routes.applicationCommand(process.env.CLIENTID, '1059349575896420374'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);