import mongoose from 'mongoose';
export default class MongoConnection {
  /** URL to access mongo */
  private readonly mongoUrl: string = 'mongodb://localhost/todoapp';

  constructor() {
    mongoose.connect(this.mongoUrl, {});

    // mongoose.connection.on('error', this.onError);
    // mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });
    // mongoose.connection.on('reconnected', this.onReconnected);
  }
}
