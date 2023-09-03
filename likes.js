module.exports = (client) => {
    const channelLikes = [
        '1001987746442772561', '1001990780925251634'
    ]

    const addLikes = message => {
        message.react('✅')

        setTimeout(() => {
            message.react('❌')
        }, 750)
    }

    client.on('messageCreate', (message) => {
        if (channelLikes.includes(message.channel.id)) {
            addLikes(message)
        }
    })

}