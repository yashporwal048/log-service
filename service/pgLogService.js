const { pool } = require('../config/db');

/**
 * Inserts a log into the PostgreSQL database.
 * @param {string} level - The log level (INFO, ERROR, etc.).
 * @param {string} message - The log message.
 * @param {string} timestamp - The timestamp of the log.
 */
const insertLogToPostgres = async (level, message, timestamp) => {
    try {
        await pool.query(
            'INSERT INTO logs (level, message, timestamp) VALUES ($1, $2, $3)',
            [level, message, new Date(timestamp)]
        );
        console.log('📌 Log stored in PostgreSQL:', { level, message, timestamp });
    } catch (error) {
        console.error('❌ PostgreSQL insert failed:', error);
    }
};

module.exports = { insertLogToPostgres };
