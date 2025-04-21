// require('dotenv').config();

// const { produceLog } = require('./kafka');

// const sampleLogs = {
//     timestamp: new Date().toISOString(),
//     level: 'info',
//     message: 'This is a sample log message',
//     service: 'log-generator'
// }

// produceLog(sampleLogs, 'logs')
//     .then(() => console.log('Log produced successfully'))
//     .catch(() => {console.error;process.exit(1)});


const {kafkaClients} = require('./new_kafka');

const sendLog = async(logLevel, message) => {
    const producer = kafkaClients.producer;
    await producer.connect();

    await producer.send({
        topic: 'logs',
        messages: [
            {
                key: logLevel,
                value: message
            }
        ]
    });
    console.log(`Log sent successfully {$logLevel}: ${message}`);
    await producer.disconnect();
}
module.exports = {sendLog};

