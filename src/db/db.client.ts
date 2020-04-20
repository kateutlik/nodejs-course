import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '../common/config';

export const connectionToDb = (callback: Function) => {
  // mongoose.connect(MONGO_CONNECTION_STRING, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false
  // });
  //
  // const db = mongoose.connection;
  //
  // db.on('error', console.error.bind(console, 'connection error'));
  // db.once('open', async () => {
  //   console.log('DB is connected!');
  //   await db.dropDatabase();
  //   callback();
  // });
};
