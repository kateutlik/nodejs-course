import { PORT } from './common/config';
import app from './app';
const { logger } = require('./lib/logger');

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception thrown: ${err.message}`, err);
  });

console.log(PORT)
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
