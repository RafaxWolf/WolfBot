const { EmbedBuilder, MessageFlags } = require('discord.js');
const chalk = require("chalk")

module.exports = {
  name: 'interactionCreate',
  async execute (client, interaction) {
    if (interaction.isChatInputCommand()) {
      const slashcmds = client.slashCommands.get(interaction.commandName);
      console.log(interaction);

      if (slashcmds){
        if(interaction.isCommand()){
          try{
            await slashcmds.run(client, interaction);
          } catch (e) {
            console.error(`${e}`)
            interaction.reply({ content: `**Error**: \`${e}\``, flags: MessageFlags.Ephemeral });
          }

        } else if(interaction.isStringSelectMenu()){
          if(interaction.customId === 'workshop'){
            const workshop = require('../Schema/workshop-schema')
            const workshopSelectedValue = interaction.values[0];

            function aboutEmbed (client, interaction, icon, color) {
              const embed = new EmbedBuilder()
                .setTitle('Sobre la Workshop')
                .setDescription('La Workshop es un sistema creado para que la comunidad comparta sus ideas de objetos.\n\n*(**ATENCIÓN**: La creación de items en la Workshop esta limitado para los **VIP**!)*')
                .setTimestamp();
                if(icon) embed.setThumbnail(icon)
                if(color) embed.setColor(color)
                return interaction.update({ embeds: [embed], components: [], flags: MessageFlags.Ephemeral });
            }

            switch (workshopSelectedValue) {
              case 'wshome':
                await interaction.update({ content: 'Has seleccionado Home.', flags: MessageFlags.Ephemeral });
                break;

              case 'wssearch':
                await interaction.update({ content: 'Has seleccionado Search.', flags: MessageFlags.Ephemeral });
                break;

              case 'wsabout':
                aboutEmbed(client, interaction, `https://i.imgur.com/xTNwaQR.png`, "White");
                break;
            }
          }

        } else if(interaction.isButton()) {
          if(interaction.customId === "verification"){
            const member = interaction.member

            if(!member) return;
            const roleID = "862054591323570186" //* ID del rol que se asignará al verificarte (En este caso es el rol "User")

            try {
              const role = interaction.guild.roles.cache.get(roleID)
              if(!role) return interaction.reply({ content: "El rol no pudo ser encontrado!", flags: MessageFlags.Ephemeral })

              await member.roles.add(role)
              await interaction.reply({ content: "¡Te has verificado exitosamente!\nRecuerda seguir las reglas del servidor", flags: MessageFlags.Ephemeral })
            } catch (err) {
              console.log(chalk.redBright("[!] Error al asignar el rol [!]"), err)
              interaction.reply({ content: "Hubo un error al intentar asignar el Rol!", flags: MessageFlags.Ephemeral })
            }
          }

        } else if(interaction.isModalSubmit()){
          if(interaction.customId === "report"){
            const bugchannel = client.channels.cache.find(channel => channel.id === "1198523701709254656")
            const bugcategory = interaction.fields.getTextInputValue("category")
            const bugreport = interaction.fields.getTextInputValue("bugreport")

            if(!bugcategory){
              const reportEmbed = new EmbedBuilder()
              .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
              .setColor("DarkRed")
              .setTitle("¡Reporte de Bug!")
              .addFields(
                { name: "**Categoría**", value: "No Proporcionada" },
                { name: "**Reporte**", value: bugreport },
              )
              .setTimestamp()

              bugchannel.send({ embeds: [reportEmbed] })

            } else if(bugcategory){
              const reportEmbed = new EmbedBuilder()
              .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
              .setColor("DarkRed")
              .setTitle("¡Reporte de Bug!")
              .addFields(
                { name: "**Categoría**", value: bugcategory },
                { name: "**Reporte**", value: bugreport },
              )
              .setTimestamp()

              bugchannel.send({ embeds: [reportEmbed] })
            }
          }
        }
      }
}}}