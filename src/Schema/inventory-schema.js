const { Schema, model} = require("mongoose")

const inventory = new Schema({
    userID: String,
    guildID: String,
    Inventory: Object,
});

module.exports = model('inventory', inventory)