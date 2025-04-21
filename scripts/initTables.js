const { pool } = require('../config/db');

const initTables = async () => {
    try {
        const createLogTable = `CREATE TABLE IF NOT EXISTS logs(
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        level VARCHAR(50),
        message TEXT,
        service VARCHAR(50)
        );`;
        await pool.query(createLogTable);
        console.log('ALL tables created successfully!');
    } catch (e) {
        console.error('Error creating tables:', e);
    }
}

module.exports = { initTables };