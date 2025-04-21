const { kafkaClients } = require('../config/new_kafka');
const { esClient } = require('../config/elasticsearch');
require('dotenv').config();

const consumer = kafkaClients.elasticSearchClient;

consumer.on('consumer.crash', (error) => {
    console.error('Consumer crashed:', error);
});

let isConsumerRunning = false;

const runElasticsearchConsumer = async () => {
    if (isConsumerRunning) {
        console.log('Elasticsearch consumer is already running.');
        return;
    }

    try {
        await consumer.connect();
        console.log('Elasticsearch consumer connected to Kafka.');

        await consumer.subscribe({ topic: 'logs', fromBeginning: true });
        console.log('Elasticsearch consumer subscribed to topic "logs".');

        await consumer.run({
            eachBatch: async ({ batch }) => {
                const logs = batch.messages.map(message => ({
                    timestamp: new Date().toISOString(),
                    level: message.key ? message.key.toString() : 'INFO',
                    message: message.value.toString()
                }));

                try {
                    if (logs.length > 0) {
                        await esClient.bulk({
                            body: logs.flatMap(log => [
                                { index: { _index: 'logs' } },
                                log
                            ])
                        });
                        console.log(`Indexed ${logs.length} logs to Elasticsearch.`);
                    }
                } catch (error) {
                    console.error('Error indexing logs to Elasticsearch:', error);
                }
            }
        });

        isConsumerRunning = true;
        console.log('Elasticsearch consumer is running.');
    } catch (error) {
        console.error('Error in Elasticsearch consumer:', error);
        throw error;
    }
};

module.exports = { runElasticsearchConsumer };