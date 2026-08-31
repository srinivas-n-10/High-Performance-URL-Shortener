const { consumer } = require('../config/kafka');
const config = require('../config');
const connectDB = require('../config/db');
const { recordClick } = require('../services/analytics.service');

async function startConsumer() {
  await connectDB();

  await consumer.connect();

  await consumer.subscribe({
    topic: config.kafkaClickTopic,
    fromBeginning: false,
  });

  console.log('Click consumer worker started, listening for events...');

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        await recordClick(event.urlId, event);

        console.log('Processed click event for url:', event.urlId);
      } catch (err) {
        console.error('Failed to process click event:', err.message);
      }
    },
  });
}

startConsumer().catch((err) => {
  console.error('Consumer failed to start:', err.message);
  process.exit(1);
});