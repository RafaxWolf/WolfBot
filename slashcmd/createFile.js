const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")
const docxtemplater = require("docxtemplater")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("createfile")
    .setDescription("asd")
    .addUserOption(option =>
      option
      .setName("user")
      .setDescription("ad")
      .setRequired(true)),

    async run(client, interaction){
      const user = interaction.options.getUser("user")
      //interaction.reply({ content: "Asd" })
      const channel = [
        "1027356750166368266"
      ]
      const userMessages = await interaction.channel.messages.fetch().then(messages => messages.filter(msg => msg.author.id === user.id));
 
/*       const Log = 
`               :!JG##&&#@@##&##GY!:                 Server:${interaction.guild.name}
           :?G#B&@P:..  #@. ..:J@@##G?:             
        .?#&P~.^@5      #@.     ?@#~~P&#?.          
      .P@B~   .@B       #@.    ~&@@5   ~B@P.        User name:${user.tag}
     Y@G:     B@.       #@.   5@@@@&.    :G@Y       
   :&&^      ~@7        #@   P@@@@@@Y      ^&&:     Latest message:${userMessages}
  ~@@J7?????7&@J????????&@?7?@@@@@@@@??????7Y@@~    
 ^@B?JJJJJJJP@#?JJJJJJJ?&@B@@@@@@@@@@B?JJJJJJ?#@^   
 &&         7@~        .&@@@@@@@@@@@@P         &&   
J@~         G@.   ..:7B@@@@@@@@@@@@&@&         ~@J  
&&          #@:7B&@@@@@@@@@@@@@@@@@!B@          &&  
@&??JJJJJJ?7&@@@@@@@@@@@@@@@@@@@@@#?&@Y?JJJJJJ??&@  
@&??J?JJ??Y@@@@@@@@@@@@@@@@@@@@@#!??&@Y?J??J?J??&@  
&&       ~&@@@@@@@@@@@@B@@@@@@@&.   #@          @&  
J@775YYG@@@@&@@@@@@@@@. #@@#.&@:    &&         !@J  
 &&.^G###PJ:5@@@@@@@@~  #@@P J@.   .@P        .@&   
 ^@#7?JJJ??#@@@&B@@@#?JJ&@@#7G@P??7P@G?JJJJJJ?#@^   
  ~@@J7???J@&&@5@@?!!7?Y&@&@@@@@@@@@@&B577?7Y@@~    
   :&&^   !@^^@?##:~~?B&@@@@@@@@@@@@@@@@G. ^&&:     
     Y@G.^@5.~@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@Y       
      .P&&@BGBB@@BBBBBGG@@GGGGPP5@@P55P&@@P.        
        .?#&P~.^@5      #@      !@7 ~5#B7.          
           :?G#B&@G:..  #@. ..:Y@@B#G?:             
               :!JG##&&#@@&&&##GY!:                 
  
Time:${Date.now(Date())}` */

        fs.opendir("/rafa/WolfBot", (err, dir) => {
          if (err) return console.log(err)
          console.log(`¡Directorio Abierto: ${dir.path}!`)
          fs.mkdir(`Database/${user.id}`, { recursive: true }, (err) => {
            if (err) return console.log(err)
            fs.writeFile(`Database/${user.id}/UserLog.txt`, Log, (err) => {
              console.log(err)
              interaction.reply({ content: "El archivo ha sido creado exitosamente!", ephemeral: true })
            }) 
          })
            //, (err) =>{
            //
                //console.log(`La carpeta ${interaction.user.id} Ha sido creada en el directorio Database!`)
                 // interaction.reply({ content: `La carpeta ${interaction.user.id} Ha sido creada en el directorio Database con exito!`, ephemeral: true })
              //, (err) => {
                //if (err) return interaction.reply({ content: `Ha ocurrido un error!\n${err}`, ephemeral: true }).then(console.log(err))
                //console.log(`WolfBot Error: ${err}`)
            //}
      })
      
//      try {
//        fs.opendir(`/Wolfbot/Database/${interaction.user.id}`, (err, dir) => {
//          if (err) return interaction.reply({ content: `Ha ocurrido un error!\n${err}`, ephemeral: true }).then(console.log(err))
//          fs.writeFileSync(`${dir}/${interaction.user.id}/User.log`, `User name:${interaction.user.tag}\nTime:${Date.now()}`, (err) => {
//            if (err) return interaction.reply({ content: `Ha ocurrido un error!\n${err}`, ephemeral: true }).then(console.log(err))
//            console.log(`WolfBot Error: ${err}`)
//          })
//        })
//      } catch (err) {
//        console.log(err)
//    }
  }
        
}