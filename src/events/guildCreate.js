module.exports = {
    name: 'guildCreate',
    execute(client, guild) {
        console.log(`Joined a new server: ${guild.name}\nServer ID: ${guild.id}`)
    },
  };