const path = require("path")

/**
 * A function to seee if the bots is executing in the build or src folder.
 * @returns Gives the path where is executing the bot, For the perfect working of all of the Systems.
 */

function getBasePath() {
    const isBuild = __dirname.includes(path.join(path.sep, "build"));
    return isBuild ? "./build" : "./src";
}

module.exports = getBasePath;