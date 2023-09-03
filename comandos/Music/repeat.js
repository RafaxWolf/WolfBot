const Discord = require('discord.js');

module.exports = {
  name: "repeat",
  alias: ["loop", "rp"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")

  let mode = null
  switch (args[0]) {
    case 'off':
      mode = 0
      break
    case 'song':
      mode = 1
      break
    case 'queue':
      mode = 2
      break
  }
  if(!isNaN(mode)) return message.channel.send("❌ | Para poner la cancion actual en Loop usa: \`w!loop song\`\nPara poner la cola en Loop usa: \`w!loop queue\`\n\nPara detener el Loop usa: \`w!loop off\`.")
  mode = queue.setRepeatMode(mode)
  mode = mode ? (mode === 2 ? 'Loop cola' : 'Loop cancion') : 'Desactivado'
  if(!mode) return message.reply("❌ | Para poner la cancion actual en Loop usa: \`w!loop song\`\nPara poner la cola en Loop usa: \`w!loop queue\`\n\nPara detener el Loop usa: \`w!loop off\`.")
  message.channel.send(`🔁 | Modo loop puesto en: \`${mode}\``)
 }

}