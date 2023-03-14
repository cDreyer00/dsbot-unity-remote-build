function getGuilds(client) {
    return client.guilds.cache.map(item => item)
}

function getChannels(client) {
    return client.channels.cache.map(item => item)
}

module.exports = {
    getGuilds,
    getChannels
}