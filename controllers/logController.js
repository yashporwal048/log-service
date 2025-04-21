const Log = require('../models/logModel');

const getLogs = async (req, res) => {
    try {
        const logs = await Log.getLogs(req);
        res.json(logs)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getLogs }