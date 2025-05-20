//*------------ Librerias ------------

const mongoose = require("mongoose")
const chalk = require("chalk")
require("dotenv").config()

//*------------ Librerias ------------

/*
  ------------------------------------------------------------------------------------------- 
  |                             Conexión a la base de datos                                 |
  -------------------------------------------------------------------------------------------
  |                                                                                         |
  | Para poder usar la base de datos,                                                       |
  | debes crear un archivo .env en la raíz del proyecto y agregar las siguientes variables: |
 *| MONGODB_USER: Usuario de la base de datos                                               |
 *| MONGODB_PASSWD: Contraseña de la base de datos                                          |
  |                                                                                         |
  -------------------------------------------------------------------------------------------
*/

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.vrs4i.mongodb.net/Database?retryWrites=true&w=majority`)
.then(db => console.log("Conectado a " + chalk.greenBright("MongoDB")))
.catch(err => console.log(err))