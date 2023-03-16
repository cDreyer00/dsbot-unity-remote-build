const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('../axiosConfig.js');
const fs = require('fs');

const data = new SlashCommandBuilder()
    .setName('log')
    .setDescription('request log file from server');

async function execute(interaction) {
    console.log('log required');

    await interaction.deferReply();
    await interaction.followUp("log command received, please wait...");

    try {
        const res = await axios.get('/log');
        const fileData = res.data;

        // Create a local file on your server
        fs.writeFileSync('log.txt', fileData);

        // Read the local file and attach it to the message
        const file = fs.readFileSync('log.txt');
        return await interaction.followUp({ files: [{ attachment: file, name: 'log.txt' }] });
    } catch (e) {
        let message = e.message;
        if (e.response) {
            message = e.response.data;
        }

        return await interaction.followUp(message);
    } finally {
        // Delete the local file after sending it
        fs.unlinkSync('log.txt');
    }
}

module.exports = {
    data,
    execute
};
