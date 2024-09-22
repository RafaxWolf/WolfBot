const { Schema, model} = require("mongoose")

const experience = new Schema({
    userID: String,
    guildID: String,
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    limit: {
        type: Number,
        default: 100
    }
});

module.exports = model('experience', experience)