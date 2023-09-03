const Discord = require('discord.js')
const { AttachmentBuilder } = require("discord.js")

module.exports = {
    name: "sprite",
    alias: [""],
  
  execute (client, message, args){
  
    const spriteSheet = AttachmentBuilder('')

    let frame = 0
    const numFrames = 4
    const fps = 30

    const canvas = Discord.Canvas(32, 32)
    const ctx = canvas.getContext('2d')

    function animate () {
        frame = (frame + 1) % numFrames
        spriteX = frame * spriteWidth
        ctx.cleanRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
        const spriteAttachment = new AttachmentBuilder
    }
    animate()
  
   }
  
  }