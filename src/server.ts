import { PORT } from './common/config';
import app from './app';
import { logger } from './lib/logger';
import { connectionToDb } from './db/db.client';

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception thrown: ${err.message}`, err);
  });

console.log(PORT);
connectionToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});


//
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@cluster0-fdbsc.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
//
//
// mongodb+srv://admin:<password>@cluster0-fdbsc.mongodb.net/test?retryWrites=true&w=majority