module.exports = (client, message, command) => {
    const cooldowns = new Map(); // Mapa para almacenar los cooldowns de los comandos
    const cooldownTime = 5; // Tiempo de cooldown en segundos

    // Verificar si el comando tiene un mapa de cooldowns, si no, crear uno nuevo
    if(!cooldowns.has(command)) {
        cooldowns.set(command, new Map());
    }

    // Obtener el tiempo actual y los timestamps del comando
    const now = Date.now();
    const timestamps = cooldowns.get(command);
    const cooldownAmount = cooldownTime * 1000;

    // Verificar si el usuario ya tiene un timestamp para este comando
    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        // Si el tiempo actual es menor que el tiempo de expiración, el comando está en cooldown
        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply({ 
                content: `⏳ | Por favor espera ${timeLeft.toFixed(1)} segundos antes de usar el comando \`${command}\` nuevamente.`
            });
        }
    }

    // Si el comando no está en cooldown, establecer el timestamp actual para el usuario
    timestamps.set(message.author.id, now);

    // Eliminar el timestamp después de que el cooldown haya expirado
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}