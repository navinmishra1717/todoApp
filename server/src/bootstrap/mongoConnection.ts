import { MONGO_URL } from '@app/config';
import mongoose from 'mongoose';

function mongoConnection() {
  mongoose.connect(MONGO_URL);
  const db = mongoose.connection;
  handleEvents(db);
}

function handleEvents(db: mongoose.Connection) {
  let mongoStat = {
    status: '1',
    updated: new Date(),
  };
  db.on('connecting', function () {
    console.log('Connecting to MongoDB...');
  });
  db.on('connected', function () {
    mongoStat.status = '1';
    mongoStat.updated = new Date();
    console.log('MongoDB connected!!');
  });
  db.on('disconnected', function () {
    if (mongoStat.status === '1') {
      mongoStat.updated = new Date();
      console.log('MongoDB disconnected!!');
    }
    mongoStat.status = '0';
  });
  db.on('reconnected', function () {
    mongoStat.updated = new Date();
    mongoStat.status = '1';
    console.log('MongoDB reconnected!');
  });
  db.on('error', function (err) {
    if (mongoStat.status === '1') {
      mongoStat.updated = new Date();
    }
    mongoStat.status = '0: ' + err;
    console.error({ error: err }, 'MongoDB connection error.');
    process.exit(0);
  });
}

export default mongoConnection;
