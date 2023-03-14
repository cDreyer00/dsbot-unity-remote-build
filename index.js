require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');

const { getChannels, getGuilds } = require('./src/helpers')
const { checkConnection } = require('./src/http-requests/httpRequestsHandler')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.on('ready', async () => {
    console.log("ds bot initialized and running")

    const gtc = getChannels(client).find(item => item.name == "geral")
    const res = await checkConnection() || "message empty";
    console.log("RES:", res)
    gtc.send(res)
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);