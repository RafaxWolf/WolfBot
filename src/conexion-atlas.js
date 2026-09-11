/*
 * Conexión anterior a MongoDB Atlas. Este archivo se conserva como referencia;
 * el bot usa ahora conexion.js para conectar con el servicio local de Docker.
 */
const mongoose = require("mongoose")
const chalk = require("chalk")
const { setServers } = require("dns/promises")
const { MONGODB_USER, MONGODB_PASSWD } = require("./config")

setServers(["1.1.1.1", "8.8.8.8"])

mongoose.connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@cluster0.vrs4i.mongodb.net/Database?retryWrites=true&w=majority`,
).then(db => {
  console.log("Conectado a " + chalk.greenBright("MongoDB Atlas"))
  console.log("Base de Datos: " + chalk.greenBright(db.connection.name))
}).catch(err => console.error(chalk.red("[!] Ha ocurrido un error al conectarse a MongoDB Atlas:\n" + err)))
