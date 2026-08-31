const { Kafka } = require('kafkajs');
const config = require('./index');

const kafka = new Kafka({
  clientId: config.kafkaClientId,
  brokers: [config.kafkaBroker],
});

const producer = kafka.producer();

const consumer = kafka.consumer({
  groupId: 'analytics-consumer-group',
});

module.exports = {
  kafka,
  producer,
  consumer,
};