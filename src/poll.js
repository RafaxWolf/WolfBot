module.exports = (client) => {
    const channelIds = [
    //'1001987746442772561',
    '936755678951903292',
    '936747411316019230',
    '947335603689771038'
    ] 

    const addReactions = message => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750)
    }

    client.on('messageCreate', (message) => {
        if (channelIds.includes(message.channel.id)) {
            addReactions(message)
        }
    })
}