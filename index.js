const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

let initialized = false;
function initds(TOKEN) {
    if (initialized) {
        console.log("discord bot already initialized")
        return
    }

    initialized = true;

    client.on('ready', () => {
        console.log("ds bot initialized and running")
        const gtc = getChannels(client).find(item => item.name == "geral")
        gtc.send("hello from server")
    });

    client.login(TOKEN);
}

function getGuilds(client) {
    return client.guilds.cache.map(item => item)
}

function getChannels(client) {
    return client.channels.cache.map(item => item)
}
