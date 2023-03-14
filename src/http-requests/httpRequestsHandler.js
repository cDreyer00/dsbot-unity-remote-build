const axios = require("axios")

const baseUrl = 'http://localhost:3000'

async function checkConnection() {
    try {
        const res = await axios.get(`${baseUrl}`)
        return res.data;
    } catch (e) {
        return e.message
    }
}

async function requestBuild() {

    const body = {
        projectName: "build-tests-remote",
        buildTarget: "android"
    }

    try {
        const res = await axios.post(`${baseUrl}/build`, body)
        return res.data;
    } catch (e) {
        return e.message
    }
}

module.exports = {
    checkConnection
}