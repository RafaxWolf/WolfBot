const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    name: 'guildBanAdd',
    execute(client, guild, user) {

    // Registra el evento de un usuario baneado
    console.log(chalk.red(`[!] El usuario ${user.tag}#${user.id} Ha sido baneado del servidor ${guild.name} (${guild.id})!`));

    if (guild.id !== '852588155126677504') { 
        console.log(chalk.redBright(`[+] El servidor no es el servidor principal. no se eliminará el usuario de la base de datos`));
        return;
    }

    console.log(chalk.redBright(`[!] Procediendo a eliminar el usuario ${user.tag}#${user.id} de la base de datos...`));

    // Elimina el usuario de la base de datos
    mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) {
            console.log(chalk.redBright(`[!] Error al listar las colecciones de la base de datos [!]`), err);
            return;
        }

        collections.forEach(collection => {
            const modelName = collection.name;
            const Model = mongoose.modelNames().includes(modelName) ? mongoose.model(modelName) : null;

            if (Model) {
                Model.deleteMany({ userID: user.id })
                    .then(result => {
                        if (result.deletedCount > 0) {
                            console.log(chalk.greenBright(`[+] Eliminadas ${result.deletedCount} entradas del usuario ${user.tag}#${user.id} en la colección ${modelName} [+]`));
                        } else {
                            console.log(chalk.yellowBright(`[?] No se encontraron entradas del usuario ${user.tag}#${user.id} en la colección ${modelName}`));
                        }
                    })
                    .catch(err => {
                        console.log(chalk.redBright(`[!] Error al eliminar entradas del usuario ${user.tag}#${user.id} en la colección ${modelName}!`), err);
                    });
            }
        });
    });

    },
};