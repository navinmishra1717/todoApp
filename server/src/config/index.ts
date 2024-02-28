export const APP_PORT = process.env.APP_PORT || 3000;
export const APP_ENV = process.env.APP_ENV || 'local';

// database config
export const MONGO_URL = String(process.env.MONGO_URL) || 'mongodb://localhost/todoapp';
