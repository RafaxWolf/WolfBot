const path = require("path")

/**
 * See if the bot is executing from the source or from the build.
 * @returns Gives the path where is executing the bot, For the perfect working of all of the Systems.
 */
function getBasePath() {
    try {
        const isBuild = __dirname.includes(path.join(path.sep, "build"));
        return isBuild ? "./build" : "./src";
    } catch (err) {
        console.error("[!] Error: " + e)
        return null;
    }
    
}

module.exports = getBasePath;