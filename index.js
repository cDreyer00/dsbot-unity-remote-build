require("dotenv").config();
const { Client, GatewayIntentBits, Events, ContextMenuCommandAssertions, AttachmentBuilder } = require('discord.js');

const { getChannels, getGuilds } = require('./src/helpers')
const { checkConnection } = require('./src/http-requests/httpRequestsHandler')
const { catchFiles, registerCommands } = require("./registerCommands.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.on(Events.ClientReady, async () => {
    // set commands to client
    await catchFiles(client);

    // register commands in the guild (only 1 time needed)
    await registerCommands();

    const channels = getChannels(client);
    channels.map((channel) => {
        if (channel.name === 'geral') {
            const file = new AttachmentBuilder(`${process.cwd()}/assets/images/relcei_ok.webp`)
            channel.send(`I'm alive ${getRandomEmoji()}`)
            channel.send({ files: [file] })
        }
    })
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        console.log('not chat input command')
        return;
    }
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.log('command not found')
    }

    command.execute(interaction)
})


function getRandomEmoji() {
    const emojis = ["😀", "😂", "😍", "👍", "🎉", "🚀", "💯", "🌟", "🔥", "👀"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

const TOKEN = process.env.TOKEN;
client.login(TOKEN);
console.log('Discord Bot Running')