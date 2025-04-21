const { Kafka } = require('kafkajs');

// Get the Kafka broker from the environment variable or default to 'localhost:9092'
const kafkaBroker = 'localhost:9092';
console.log(`Connecting to Kafka broker: ${kafkaBroker}`);

// Kafka client
const kafka = new Kafka({
    clientId: 'log-producer',
    brokers: [kafkaBroker] // Use the resolved broker
});

// Create producer
const producer = kafka.producer({
    allowAutoTopicCreation: true,
    batchSize: 16384, //size of batch
    lingerMs:5 //wait time for batch
});

// const produceLog = async (logData, topic) => {
//     try {
//         await producer.connect();
//         console.log(`Connected to Kafka broker: ${kafkaBroker}`);
//         await producer.send({
//             topic: topic,
//             messages: [{ value: JSON.stringify(logData) }]
//         });
//         // console.log(`Message sent to topic "${topic}":`, logData);
//     } catch (error) {
//         console.error('Error producing log:', error);
//         process.exit(1);
//     } finally {
//         await producer.disconnect();
//         console.log('Producer disconnected');
//     }
// };

const sendLogs = async (count = 1000) => {
    try {
        await producer.connect();
        console.log(`Connected to Kafka broker: ${kafkaBroker}`);
        for (let i = 0; i < count; i++) {
            await producer.send({
                topic: 'logs',
                messages: [{ value: `Log message ${i} at ${new Date().toISOString()}` }],
                acks: -1 //producer waits for all replicas to acknowledge
            });
        }
        console.log(`Sent ${count} messages to Kafka`);
    } catch (error) {
        console.error('Error sending logs:', error);
    } finally {
        await producer.disconnect();
        console.log('Producer disconnected');
    }
};
sendLogs(10)
// module.exports = { produceLog, kafka };
