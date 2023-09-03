module.exports = {
    name: "iframe",
    alias: [""],
  
  execute (client, message, args){
  
    const url = args[0]
     if(!url) return message.reply({ content: "asd" })

     const iframe = `<iframe src="${url}" frameborder="0" width="100%" height="500"></iframe>`
     message.channel.send(iframe)

   }
  
  }