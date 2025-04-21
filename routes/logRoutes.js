const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.get('/logs', logController.getLogs);

module.exports = router;
