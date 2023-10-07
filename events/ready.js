const moment = require('moment');
const format = require("moment")
const tz = require("moment-timezone");

const { CHANNEL_ID, TIMEZONE, FORMAT, UPDATE_INTERVAL } = process.env;

module.exports = {
  name: 'ready',
   execute(client) {

    const timeNow = moment().tz(TIMEZONE).format(FORMAT);

    const clockChannel = client.channels.cache.get(CHANNEL_ID)
    
    //const thwClockChannel = client.channels.cache.get(CHANNEL_THW)

      clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
        .catch(console.error)

      setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT)
      clockChannel.edit({ name: `🕒 ${timeNowUpdate}`}, 'Clock update')
          .catch(console.error)
}, UPDATE_INTERVAL)
/*
      thwClockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
        .catch(console.error)

      setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT)
      thwClockChannel.edit({ name: `🕒 ${timeNowUpdate}`}, 'Clock update')
          .catch(console.error)
}, UPDATE_INTERVAL) */

//    memberCountChannel.edit({ name: `👥 ${memberCount}` }, 'Member count')
//      .catch(console.error)

//    setInterval(() => {
//    const newMemberCount = guild.members.cache.filter(member => !member.user.bot).size;
//    memberCountChannel.edit({ name: `👥 ${newMemberCount}` }, 'Member count')
//      .catch(console.error)
//}, 10000)

    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setPresence({ activities: [{ name: "w!help - /help" }], status: "dnd"});

    const poll = require('../poll')
    const likes = require('../likes')

    poll(client)
    likes(client)
  },
};