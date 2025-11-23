const { Schema, model} = require("mongoose")

//const ObjectId = Schema.ObjectId
const economia = new Schema({
    guildID: String,
    userID: String,
    dinero: {
        type: Number,
        default: 0
    },
    dinerobanco: {
        type: Number,
        default: 0
    },
});

module.exports = model('economia', economia)