module.exports = {
  name: "repeat",
  alias: ["loop", "rp"],
  inVoiceChannel: true,
async execute (client, message, args){
  const queue = client.distube.getQueue(message)
  if (!queue) return message.channel.send("❌ | No hay nada en la cola!")

  let mode
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

    default:
      return message.channel.send("[❌ | Syntax Error | ❌]\nPara poner la canción en bucle usa: \`w!loop song\`\nPara poner la cola en bucle usa: \`w!loop queue\`\n\nPara detener el bucle usa: \`w!loop off\`.")
  }

  mode = queue.setRepeatMode(mode)
  mode = mode ? (mode === 2 ? 'Loop cola' : 'Loop canción') : 'Desactivado'

  message.channel.send(`🔁 | Modo loop puesto en: \`${mode}\``)
 }

}
