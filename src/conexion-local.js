// Conexión a MongoDB local mediante el servicio `mongo_db` de Docker Compose.
const mongoose = require("mongoose")
const chalk = require("chalk")
const { MONGODB_URI } = require("./config")

mongoose.connect(MONGODB_URI)
  .then(db => {
    console.log("Conectado a " + chalk.greenBright("MongoDB local"))
    console.log("Base de Datos: " + chalk.greenBright(db.connection.name))
  })
  .catch(err => {
    console.error(chalk.red("[!] Ha ocurrido un error al conectarse a MongoDB local:\n" + err))
  })
