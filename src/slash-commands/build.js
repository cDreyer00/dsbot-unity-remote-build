const { SlashCommandBuilder, ComponentAssertions } = require('@discordjs/builders');
const axios = require('../axiosConfig.js')

const data = new SlashCommandBuilder()
    .setName('build')
    .setDescription('Starts the build process on the target project server')
    .addStringOption(option =>
        option.setName("name")
            .setDescription("The project name to be builded")
            .setMaxLength(20)
    )
    .addStringOption(option =>
        option.setName("build-target")
            .setDescription("Specify either windows or android")
            .setMaxLength(10)
    )

async function execute(interaction) {

    console.log('Build required')
    let name = interaction.options.get('name')
    let buildTarget = interaction.options.get('build-target')

    await interaction.deferReply();
    if (!buildTarget || !name) {
        return await interaction.followUp('No build target or name provided')
    }

    buildTarget = buildTarget.value
    name = name.value

    await interaction.followUp("build command recieved, please wait...");
    try {
        const res = await axios.post('/build', {
            projectName: name,
            buildTarget: buildTarget
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
