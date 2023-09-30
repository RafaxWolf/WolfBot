const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute (client, interaction) {
    if (interaction.isChatInputCommand()) {
      const slashcmds = client.slashcommands.get(interaction.commandName);
      console.log(interaction);

      if (!slashcmds) return;

      try {
        await slashcmds.run(client, interaction);
      } catch (e) {
        console.error(e);
        interaction.reply({ content: `**Error**: \`${e}\``, ephemeral: true });
      }
    } else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'workshop') {
        const workshopSelectedValue = interaction.values[0];

        function aboutEmbed (client, interaction, icon) {
          const embed = new EmbedBuilder()
            .setTitle('Sobre la Workshop')
            .setDescription('La Workshop es un sistema creado para que la comunidad comparta sus ideas de items')
            .setTimestamp();
            if(icon) embed.setThumbnail(icon)
            return interaction.update({ ephemeral: true, embeds: [embed], components: [] });
        }

        if (workshopSelectedValue === 'wshome') {
          // Acciones para wshome
        } 
        if (workshopSelectedValue === 'wssearch') {
          // Acciones para wssearch
        }
        if (workshopSelectedValue === 'wsabout') {
          aboutEmbed(client, interaction, `${interaction.guild.iconURL()}`);
        }

      }

    }

  },

};