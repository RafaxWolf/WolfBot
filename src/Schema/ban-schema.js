const { Schema, model} = require("mongoose")

const bans = new Schema({
  guildID: String,
  userID: String,
  moderadorID: String,
  reason: {
    type: String
  },
  startBan: {
    type: Date
  },
  endBan: {
    type: Date
  }
});

module.exports = model('bans', bans)