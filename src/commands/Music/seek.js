module.exports = {
  name: "seek",
  alias: [""],
  inVoiceChannel: true,
async execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")
  if(!args[0]) {
    return message.channel.send("❌ | Syntax Error | ❌\nCorrecto uso del comando: \`w!seek <Time> \`")
  }

  const time = Number(args[0])
  if(!Number.isFinite(time) || time < 0) return message.channel.send("❌ | Por favor ingrese un segundo valido!")

  const secondaryTime = Number(args[2])

  try {
    if(args[1] === "minute" && Number.isFinite(secondaryTime)){
      let minuto = time * 60
      let minutoNuevo = minuto + secondaryTime
      await queue.seek(minutoNuevo)
      return message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\` con \`${secondaryTime}\` segundos`)
    } else {

    if(args[1] === "hour"){
      let hora = time * 3600
      await queue.seek(hora)
      return message.channel.send(`☑️ | Reproduciendo desde la hora: \`${time}\``)
    } else {

      if(args[1] === "minute"){
        let minuto = time * 60
        await queue.seek(minuto)
        return message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\``)
        } else {

          await queue.seek(time)
          return message.channel.send(`☑️ | Reproduciendo desde el segundo: \`${time}\``)
        }
      }
    }
  } catch (error) {
    console.error('Error al adelantar la canción:', error)
    return message.channel.send('❌ | No pude adelantar la canción a ese punto.')
  }
    
  }
}
