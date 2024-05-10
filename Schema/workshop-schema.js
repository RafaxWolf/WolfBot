const { Schema, model} = require("mongoose")

const Workshop = new Schema({
    //-----Creador/Servidor------
    creatorID: String,
    guildID: String,

    //----------Objeto-----------    
    itemName: String,
    itemDesc: {
        type: String,
    },
    itemAvatar: {
        name: String,
        data: Buffer,
    },
    price: {
        type: Number,
        default: 0
    },
    limit: Number,
    timestamp: Date,
    
    //----------Comunidad--------
    bought: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    }
});

module.exports = model('Workshop', Workshop)