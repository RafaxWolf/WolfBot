const fs = require("fs")
const path = require("path")
const file = path.join(__dirname, '../bannedsongs.json')

if(!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ songs: [] }, null, 2))
}

function loadBanned() {
    return JSON.parse(fs.readFileSync(file, "utf-8"))
}

function saveBan(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function isBanned(url) {
    const { songs } = loadBanned();
    return songs.includes(url)
}

function addBan(url){
    const data = loadBanned()
    if(!data.songs.includes(url)){
        data.songs.push(url)
        saveBan(data)
        return true;
    }
    return false;
}

function removeBan(url) {
    const data = loadBanned()
    const index = data.songs.indexOf(url)
    if(index !== -1){
        data.songs.splice(index, 1)
        saveBan(data)
        return true
    }
    return false
}

function listBans() {
    return loadBanned().songs
}

module.exports = {
    isBanned,
    addBan,
    removeBan,
    listBans
}