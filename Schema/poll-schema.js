const { Schema, model} = require("mongoose")

const poll = new Schema({
    userID: String,
    ask: String,
    opcion1: {
        type: String
    },
    opcion2: {
        type: String
    },
    timespamp: String
});

module.exports = model('poll', poll)