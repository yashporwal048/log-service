const { pool } = require('../config/db');

class Log {
    static async createTable() {
        const createTableQuery = `CREATE TABLE IF NOT EXISTS logs(
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        level VARCHAR(50),
        message TEXT,
        service VARCHAR(50)
        );`;
        try {
            await pool.query(createTableQuery);
            console.log('Table created successfully!');
        } catch (e) {
            console.error('Error creating table:', e);
        }
    }

    static async getLogs({ level, service, limit = 10, offset = 0 }) {
        let query = `SELECT * FROM logs WHERE 1=1`;
        let conditions = [];
        let values = [];
        if (level) {
            values.push(level);
            conditions.push(`level = $${values.length}`);
        }
        if (service) {
            values.push(service);
            conditions.push(`service = $${values.length}`);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }
        query += ` ORDER BY timestamp DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
        values.push(parseInt(limit), parseInt(offset));

        const result = await pool.query(query, values);
        return result.rows;
    }
}

module.exports = Log