const { producer } = require('../config/kafka');
const config = require('../config');

let isConnected = false;

async function connectProducer() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log('Kafka producer connected');
  }
}

async function publishClickEvent(payload) {
  await producer.send({
    topic: config.kafkaClickTopic,
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });
}

module.exports = {
  connectProducer,
  publishClickEvent,
};