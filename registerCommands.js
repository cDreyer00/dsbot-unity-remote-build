require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { Client, Intents, Collection, REST, Routes } = require('discord.js');

const TOKEN = process.env.TOKEN
const APP_ID = process.env.APP_ID
const GUILD_ID = process.env.GUILD_ID

const commands = []

function catchFiles(client) {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, 'src', 'slash-commands')
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

        commands.push(command.data.toJSON());
    }
}


async function registerCommands() {
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(APP_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    catchFiles,
    registerCommands,
}