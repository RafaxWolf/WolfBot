const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("qwertyuiop")
    .addSubcommand(subcommand =>
        subcommand
        .setName("segundos")
        .setDescription("asd")
        .addNumberOption(option =>
            option
            .setName("seconds")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(60)
            .setRequired(true)
            ))
    .addSubcommand(subcommand =>
        subcommand
        .setName("minutos")
        .setDescription("asd")
        .addNumberOption(option =>
            option
            .setName("minutes")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(60)
            .setRequired(true)
            )
        .addNumberOption(option =>
            option
            .setName("seconds")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(60)
            //.setRequired(true)
                ))
    .addSubcommand(subcommand =>
        subcommand
        .setName("horas")
        .setDescription("asd")
        .addNumberOption(option =>
            option
            .setName("hours")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(24)
            .setRequired(true)
            )
        .addNumberOption(option =>
            option
            .setName("minutes")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(60)
            //.setRequired(true)
            )
        .addNumberOption(option =>
            option
            .setName("seconds")
            .setDescription("asdf")
            .setMinValue(1)
            .setMaxValue(60)
            //.setRequired(true)
            )),
    inVoiceChannel: true,

    async run(client, interaction){
        
        const seconds = interaction.options.getNumber("seconds") //Detect the seconds
        const minutes = interaction.options.getNumber("minutes")
        const hours = interaction.options.getNumber("hours")
        const queue = client.distube.getQueue(message)

        if(!queue) return message.channel.send("❌ | No hay nada en la cola!") //detect if the server has an a queue

        let realMinute = minutes * 60 + seconds || minutes * 60
        let realHour = hours * 3600 + realMinute || hours * 3600 + realMinute

        if(hours){
            queue.seek(realHour)
        };
        if(minutes){
            if(!seconds){
                queue.seek(minutes)
                interaction.reply({ content: `☑️ | Reproduciendo desde el minuto: \`${minutes}}\`` })
            } else {
                queue.seek(realMinute)
                interaction.reply({ content: `☑️ | Reproduciendo desde el minuto: \`${minutes}\` con \`${seconds}\`` })
            }
        };
        if(seconds){
            queue.seek(seconds)
            interaction.reply({ content: `☑️ | Reproduciendo desde el segundo: \`${seconds}\`` })
        };

    }
        
}