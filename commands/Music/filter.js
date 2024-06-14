module.exports = {
  name: "filter",
  alias: ["filtro"],
  inVoiceChannel: true,
async execute (client, message, args){
    const queue = client.distube.getQueue(message)
    if(!queue) return message.channel.send("")


    }

}