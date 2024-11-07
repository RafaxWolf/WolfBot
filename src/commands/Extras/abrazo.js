module.exports = {
  name: "abrazo",
  alias: ["hug"],

execute (client, message, args){

    message.channel.send(`¡Aquí tienes un abrazo ${message.author}!`);

 }

}