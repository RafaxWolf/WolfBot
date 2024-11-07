module.exports = {
  name: "numero-random",
  alias: ["nr", "randomnumber", "numerorandom"],

execute (client, message, args){
    var random = Math.floor(Math.random() * 20) + 1
    message.channel.send(`Numero: ${random}`);

 }

}