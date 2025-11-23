const { REST, Routes } = require('discord.js')
const chalk = require('chalk');
require("dotenv").config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID), { body: [] })
    .then(() => console.log('[!] Todos los Slash Commands han sido eliminados exitosamente.'))
    .catch(console.error)


