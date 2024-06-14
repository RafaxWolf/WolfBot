const { EmbedBuilder } = require('discord.js');
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
            interaction.reply({ content: `**Error**: \`${e}\``, ephemeral: true });
          }

        } else if(interaction.isStringSelectMenu()){
          if(interaction.customId === 'workshop'){
            const workshopSelectedValue = interaction.values[0];
            const workshop = require('../Schema/workshop-schema')
      
            function aboutEmbed (client, interaction, icon, color) {
                const embed = new EmbedBuilder()
                  .setTitle('Sobre la Workshop')
                  .setDescription('La Workshop es un sistema creado para que la comunidad comparta sus ideas de objetos.\n\n*(**ATENCIÓN**: La creación de items en la Workshop esta limitado para los **VIP**!)*')
                  .setTimestamp();
                  if(icon) embed.setThumbnail(icon)
                  if(color) embed.setColor(color)
                  return interaction.update({ ephemeral: true, embeds: [embed], components: [] });
            }
      
            if (workshopSelectedValue === 'wshome') {
                // Acciones para wshome
                await interaction.update({ content: 'Has seleccionado Home.', ephemeral: true });
            }

            if (workshopSelectedValue === 'wssearch') {
                // Acciones para wssearch
                await interaction.update({ content: 'Has seleccionado Search.', ephemeral: true });
            }

            if (workshopSelectedValue === 'wsabout') {
                aboutEmbed(client, interaction, `https://i.imgur.com/xTNwaQR.png`, "White");
            }
          }

        } else if(interaction.isButton()) {
          if(interaction.customId === "verification"){
            const member = interaction.member

            if(!member) return;

            const roleID = "862054591323570186"

            try {
              const role = interaction.guild.roles.cache.get(roleID)

              if(!role) return interaction.reply({ content: "El rol no pudo ser encontrado!", ephemeral: true })

              await member.roles.add(role)
              await interaction.reply({ content: "¡Te has verificado exitosamente!\nRecuerda seguir las reglas del servidor", ephemeral: true })
            } catch (err) {
              console.log(chalk.redBright("[!] Error al asignar el rol [!]"), err)
              interaction.reply({ content: "Hubo un error al intentar asignar el Rol!", ephemeral: true })
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