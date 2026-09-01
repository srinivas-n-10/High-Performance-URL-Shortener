const { producer } = require('../config/kafka');
const config = require('../config');

let isConnected = false;

async function connectProducer() {
  if (!producer) {
    console.warn('Kafka not configured. Skipping Kafka connection.');
    return;
  }

  if (isConnected) {
    return;
  }

  try {
    await producer.connect();
    isConnected = true;
    console.log('Kafka producer connected');
  } catch (error) {
    console.warn('Kafka unavailable. Continuing without Kafka.');
    console.warn(`Kafka error: ${error.message}`);
  }
}

async function publishClickEvent(payload) {
  if (!producer || !isConnected) {
    console.warn('Kafka unavailable. Click event was not published.');
    return;
  }

  try {
    await producer.send({
      topic: config.kafkaClickTopic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
  } catch (error) {
    console.error('Failed to publish click event:', error.message);
  }
}

module.exports = {
  connectProducer,
  publishClickEvent,
};