const Discord = require('discord.js');
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
  if(isNaN(time)) return message.channel.send("❌ | Porfavor ingrese un segundo valido!")

  const secundaryTime = Number(args[2])
 // if(isNaN(secundaryTime)) return message.channel.send("❌ | Porfavor ingrese un segundo valido!")

//   if(args[1] === "minute"){
//      let minuto = time * 60
//      queue.seek(minuto)
//      message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\``)
//    }else {
//      queue.seek(time)
//      message.channel.send(`☑️ | Reproduciendo desde el segundo: \`${time}\``)
//    }

    if(args[1] === "minute" && secundaryTime){
      let minuto = time * 60
      let minutoNuevo = minuto + secundaryTime
      queue.seek(minutoNuevo)
      message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\` con \`${secundaryTime}\` segundos`)
//    }else {
//      let minuto = time * 60
//      queue.seek(minuto)
//      message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\``)
    }else {
    if(args[1] === "hour"){
      let hora = time * 3600
      queue.seek(hora)
      message.channel.send(`☑️ | Reproduciendo desde la hora: \`${time}\``)
    }else {
      if(args[1] === "minute"){
        let minuto = time * 60
        queue.seek(minuto)
        message.channel.send(`☑️ | Reproduciendo desde el minuto: \`${time}\``)
      }else {
        queue.seek(time)
        message.channel.send(`☑️ | Reproduciendo desde el segundo: \`${time}\``)
      }
    }      
    }

    
  }
}
