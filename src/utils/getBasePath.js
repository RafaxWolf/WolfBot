const path = require("path")

function getBasePath() {
    const isBuild = __dirname.includes(path.join(path.sep, "build"));
    return isBuild ? "./build" : "./src";
}

module.exports = getBasePath;