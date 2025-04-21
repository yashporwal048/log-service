const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();
const esClient = new Client({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD
    }
});

async function checkConnection() {
    try {
        const health = await esClient.cluster.health();
        console.log('Elasticsearch cluster health:', health.status);
    } catch (err) {
        console.error('Elasticsearch cluster is down!');
    }
}

checkConnection();
module.exports = { esClient };