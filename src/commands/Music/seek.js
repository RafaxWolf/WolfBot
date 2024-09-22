const ms = require('ms')

module.exports = {
  name: "seek",
  alias: [""],
  inVoiceCHannel: true,
async execute (client, message, args){

  const queue = client.distube.getQueue(message)
  if(!queue) return message.channel.send("❌ | No hay nada en la cola!")
  if(!args[0]) {
    return message.channel.send("❌ | Syntax Error | ❌\nCorrecto uso del comando: \`w!seek <Time> \`")
  }

  const time = Number(args[0])
  if(isNaN(time)) return message.channel.send("❌ | Por favor ingrese un segundo valido!")

  const secondaryTime = Number(args[2])

    if(args[1] === "minute" && secondaryTime){
      let minuto = time * 60
      let minutoNuevo = minuto + secondaryTime
      queue.seek(minutoNuevo)
      message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\` con \`${secondaryTime}\` segundos`)
    } else {

    if(args[1] === "hour"){
      let hora = time * 3600
      queue.seek(hora)
      message.channel.send(`☑️ | Reproduciendo desde la hora: \`${time}\``)
    } else {

      if(args[1] === "minute"){
        let minuto = time * 60
        queue.seek(minuto)
        message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\``)
        } else {

          queue.seek(time)
          message.channel.send(`☑️ | Reproduciendo desde el segundo: \`${time}\``)
        }
      }
    }
    
  }
}
