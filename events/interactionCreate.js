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

        if (workshopSelectedValue === 'wshome') {
          // Acciones para wshome
        } else if (workshopSelectedValue === 'wssearch') {
          // Acciones para wssearch
        } else if (workshopSelectedValue === 'wsabout') {
          const aboutEmbed = new EmbedBuilder()
            .setTitle('Sobre la Workshop')
            .setThumbnail(interaction.guild.iconURL())
            .setDescription('La Workshop es un sistema creado para que la comunidad comparta sus ideas de items')
            .setTimestamp();

          await interaction.update({ ephemeral: true, embeds: [aboutEmbed], components: [] });
        }
      }
    }
  },
};