const { kafkaClients } = require('../config/new_kafka');
const { insertLogToPostgres } = require('../service/pgLogService');

const pgConsumer = kafkaClients.postgresClient;

let isConsumerRunning = false; // Flag to track if the consumer is already running

const runPgConsumer = async () => {
    if (isConsumerRunning) {
        console.log('PostgreSQL consumer is already running.');
        return; // Prevent duplicate initialization
    }

    try {
        await pgConsumer.connect();
        console.log('PostgreSQL consumer connected to Kafka.');

        // Subscribe to the topic BEFORE starting the consumer
        await pgConsumer.subscribe({ topic: 'logs', fromBeginning: true });
        console.log('PostgreSQL consumer subscribed to topic "logs".');

        // Start the consumer
        await pgConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const log = {
                    level: message.key ? message.key.toString() : 'INFO',
                    message: message.value.toString(),
                    timestamp: new Date().toISOString()
                };

                try {
                    // Insert the log into PostgreSQL
                    await insertLogToPostgres(log.level, log.message, log.timestamp);
                    console.log(`Inserted log into PostgreSQL:`, log);
                } catch (error) {
                    console.error('Error inserting log into PostgreSQL:', error);
                }
            }
        });

        isConsumerRunning = true; // Mark the consumer as running
        console.log('PostgreSQL consumer is running.');
    } catch (error) {
        console.error('Error in PostgreSQL consumer:', error);
        throw error; // Rethrow the error to handle it in the caller
    }
};

module.exports = { runPgConsumer };