const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const bans = require('../Schema/ban-schema')
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("Mod Commands")
    .addSubcommandGroup(group =>
        group
        .setName("bans")
        .setDescription("ban system")
        .addSubcommand(subcommand =>
            subcommand
            .setName("ban")
            .setDescription("asd")
            .addUserOption(option => 
                option
                .setName("user")
                .setDescription("asd")
                .setRequired(true)
                )
            .addNumberOption(option =>
                option
                .setName("horas")
                .setDescription("asd")
                .setMinValue(1)
                .setMaxValue(23)
                .setRequired(true)
                )
            .addStringOption(option =>
                option
                .setName("reason")
                .setDescription("asd")
                .setRequired(true)
                )
            .addAttachmentOption(option =>
                option
                .setName("image")
                .setDescription("ytrewq")
                )
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName("superban")
            .setDescription("qwerty")
            .addUserOption(option =>
                option
                .setName("user")
                .setDescription("asd")
                .setRequired(true)
                )
            .addAttachmentOption(option =>
                option
                .setName("image")
                .setDescription("ytrewq")
                )
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName("permaban")
            .setDescription("dsa")
            .addUserOption(option =>
                option
                .setName("user")
                .setDescription("dsa")
                .setRequired(true)
                )
            .addStringOption(option =>
                option
                .setName("reason")
                .setDescription("asd")
                .setRequired(true)
                )
            .addAttachmentOption(option =>
                option
                .setName("image")
                .setDescription("ytrewq")
                )
            )
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async run(client, interaction){
        const user = interaction.options.getUser("user")
        const NormalTime = interaction.options.getNumber("horas")
        const reason = interaction.options.getString("reason")
        const image = interaction.options.getAttachment("image")
        const imageURL = image.url

        let normalrole = interaction.guild.roles.cache.find(
        role => role.id === ""
        )  

    }
        
}