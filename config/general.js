require('dotenv/config');

module.exports = {
  app: {
    PORT: process.env.APP_PORT,
  },
  logger: {
    susbcriber: process.env.SUBSCRIBER,
    topic_arn: process.env.LOGGER_ARN,
    level: process.env.LEVEL,
  },
};
