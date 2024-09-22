const { REST, Routes } = require('discord.js')
require("dotenv").config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID), { body: [] })
    .then(() => console.log('Borrados todos los comandos del servidor exitosamente'))
    .catch(console.error)


