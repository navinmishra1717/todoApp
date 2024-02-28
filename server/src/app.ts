import express, { Application } from 'express';
import { applyMiddleware } from '@app/bootstrap/middlewares';
import errorHandler from '@app/bootstrap/middlewares/errorHandler';
import { HttpException } from '@app/exceptions';
import { router } from './router';
import dbConnection from './bootstrap/mongoConnection';

const app: Application = express();

const App = async (): Promise<Application> => {
  try {
    await applyMiddleware(app);
    app.use('/', router);
    app.use(errorHandler);
    dbConnection();
    return app;
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
};

export default App;
