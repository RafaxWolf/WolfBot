const { Schema, model} = require("mongoose")

const bans = new Schema({
  guildID: String,
  userID: String,
  moderadorID: String,
  
  reason: {
    type: String,
    default: "Razon no especificada."
  },

  startBan: {
    type: Date,
    default: Date.now()
  },
  endBan: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model('bans', bans)