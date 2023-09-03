const { Schema, model} = require("mongoose")

const warn = new Schema({
    userID: String,
    moderadorID: String,
    razon: {
        type: String
    },
    timestamp: Date
});

module.exports = model('warn', warn)