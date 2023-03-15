const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('../axiosConfig.js')

const data = new SlashCommandBuilder()
    .setName('clone')
    .setDescription('clone repository from url provided locally')
    .addStringOption(option =>
        option.setName("url")
            .setDescription("The URL from a git repository to clone")
            .setMaxLength(200)
    )
    .addStringOption(option =>
        option.setName("name")
            .setDescription("Name of the project")
            .setMaxLength(20)
    )


async function execute(interaction) {

    console.log('Clone required')
    let url = interaction.options.get('url')
    let name = interaction.options.get('name')

    await interaction.deferReply();
    if (!url || !name) {
        return await interaction.followUp('No url or name provided')
    }

    url = url.value
    name = name.value

    await interaction.followUp("clone command recieved, please wait...");
    try {
        const res = await axios.post('/clone', {
            repoURL: url,
            projectName: name
        })

        return await interaction.followUp(res.data)
    } catch ({ response }) {
        const res = response ? response.data || e.message : e.message;
        return await interaction.followUp(res);
    }
}

module.exports = {
    data,
    execute
};
