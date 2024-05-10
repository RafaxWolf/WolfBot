const { Schema, model} = require("mongoose")

const parties = new Schema({
  guildID: String,
  creatorID: String,
  channelID: String,
  channelOwner: String,
  activity: {
    type: String,
  }
});

module.exports = model('party', parties)