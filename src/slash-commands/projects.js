const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('../axiosConfig.js');

const data = new SlashCommandBuilder()
    .setName('projects')
    .setDescription('request a list of projects from server');

async function execute(interaction) {
    console.log('projects required');

    await interaction.deferReply();
    try {
        const res = await axios.get('/projects');

        let message = `There is ${res.data.length} projects in the server: `
        res.data.map(project => {
            message = message.concat('\n', `    -> ${project}`)
        })
        console.log(message);
        return await interaction.followUp(message);
    } catch (e) {
        let message = e.message;
        if (e.response) {
            message = e.response.data;
        }

        return await interaction.followUp(message);
    }
}

module.exports = {
    data,
    execute
};
