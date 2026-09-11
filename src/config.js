const chalk = require("chalk");
require("dotenv").config({ quiet: true });

let { TOKEN, CLIENTID, GUILD, VERIFICATION_CHANNEL, MONGODB_URI, MONGODB_USER, MONGODB_PASSWD, GENIUS_API_KEY, TERMS_CHANNEL } = process.env;

//* Validación de credenciales de Discord
if (!TOKEN || !CLIENTID) {
    console.error(chalk.red("❌ | Error: Token o Client ID Faltantes.\nPor favor, revisa tu archivo '.env' y asegúrate de que las variables 'TOKEN' y 'CLIENTID' estén definidas.\n"));
    process.exit(1);
}

//? Si el canal de verificación no está definido en el archivo .env, se asigna un valor predeterminado y se muestra una advertencia en la consola.
if(!VERIFICATION_CHANNEL) {
    VERIFICATION_CHANNEL = "1063533274233852005" // Valor predeterminado si no se encuentra en el archivo .env
    console.warn(chalk.yellow("⚠️ | La variable VERIFICATION_CHANNEL no está definida en el archivo .env. Se utilizará el valor predeterminado: 1063533274233852005"));
}

//? Si el canal de Normas/Terminos no está definido en el archivo .env, se asigna un valor predeterminado y se muestra una advertencia en la consola.
if (!TERMS_CHANNEL) {
    TERMS_CHANNEL = "936741059642413107" // Valor predeterminado si no se encuentra en el archivo .env
    console.warn(chalk.yellow("⚠️ | La variable TERMS_CHANNEL no está definida en el archivo .env. Se utilizará el valor predeterminado: 936741059642413107"));
}

if (!MONGO_URI){
    MONGODB_URI = "mongodb://mongo_db:27017/Database"
}

module.exports = {
    TOKEN, 
    CLIENTID, 
    GUILD, 
    VERIFICATION_CHANNEL, 
    TERMS_CHANNEL, 
    MONGODB_USER, 
    MONGODB_PASSWD, 
    MONGODB_URI,
    GENIUS_API_KEY
};
