/*
  *  ╔═════════════════════════════════════════════════════════════════════════════════════════╗
  *  ║                             Conexión a la base de datos                                 ║
  *  ╠═════════════════════════════════════════════════════════════════════════════════════════╣
  *  ║                                                                                         ║
  *  ║ Para poder usar la base de datos,                                                       ║
  *  ║ debes crear un archivo .env en la raíz del proyecto y agregar las siguientes variables: ║
  *  ║ MONGODB_USER: Usuario de la base de datos                                               ║
  *  ║ MONGODB_PASSWD: Contraseña de la base de datos                                          ║
  *  ║                                                                                         ║
  *  ╚═════════════════════════════════════════════════════════════════════════════════════════╝
*/


//*------------ Librerías ------------*\\
const mongoose = require("mongoose")
const chalk = require("chalk")
const { setServers } = require("dns/promises")
const { MONGODB_USER, MONGODB_PASSWD } = require("./config")

// Fix para evitar errores al intentar conectarse a la base de datos en Atlas
setServers(["1.1.1.1", "8.8.8.8"])

mongoose.connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@cluster0.vrs4i.mongodb.net/Database?retryWrites=true&w=majority`,
)
.then(db => console.log(
  "Conectado a " + chalk.greenBright("MongoDB")
)).catch(err => console.log(err))