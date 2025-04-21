const { runElasticsearchConsumer } = require('./consumers/consumer_es');
const { runPgConsumer } = require('./consumers/consumer_pg');
const logRoutes = require('./routes/logRoutes');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', logRoutes)
// const {initTables} = require('./scripts/initTables');
const Log = require('./models/logModel');
const runServer = async () => {
    try {
        console.log('Starting Kafka Consumers...');
        
        // Start Kafka consumers
        await Promise.all([
            runElasticsearchConsumer(),
            runPgConsumer()
        ]);

        console.log('✅ Consumers are running!');

        // Start the Express server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

Log.createTable()
    .then(() => {
        console.log('All tables created successfully');
        runServer(); // Properly invoke the server function
    })
    .catch((error) => {
        console.error('Error creating tables:', error);
        process.exit(1); // Exit the process with an error code
    });
