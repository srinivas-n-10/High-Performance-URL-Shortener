const { Kafka } = require('kafkajs');
const config = require('./index');

let kafka = null;
let producer = null;
let consumer = null;

if (config.kafkaBroker) {
  kafka = new Kafka({
    clientId: config.kafkaClientId,
    brokers: [config.kafkaBroker],
  });

  producer = kafka.producer();

  consumer = kafka.consumer({
    groupId: 'analytics-consumer-group',
  });
} else {
  console.warn('Kafka not configured. Running without Kafka.');
}

module.exports = {
  kafka,
  producer,
  consumer,
};