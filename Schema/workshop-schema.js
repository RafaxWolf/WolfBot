const { Schema, model} = require("mongoose")

const Workshop = new Schema({
    creatorID: String,
    guildID: String,
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
    timestamp: Date
});

module.exports = model('Workshop', Workshop)