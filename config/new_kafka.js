const {Kafka} = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
    clientId: 'log-service',
    brokers: [process.env.KAFKA_BROKER]
})

const producer = kafka.producer();

const kafkaClients = {
    producer,
    elasticSearchClient: kafka.consumer({
        groupId:'log-group', //shared group Id for load balancing
        clientId: 'es-consumer',
        maxBytes: 10485760, // 10MB fetch size,
        maxWaitTimeInMs: 100 //wait for 100ms before fetching messages
    }),
    postgresClient: kafka.consumer({
        groupId:'log-group',
        clientId: 'pg-consumer',
        maxBytes: 10485760, // 10MB fetch size,
        maxWaitTimeInMs: 100 //wait for 100ms before fetching messages
    })
}

module.exports = {kafka, kafkaClients};