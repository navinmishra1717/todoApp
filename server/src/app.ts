import express, { Application } from "express";
import { applyMiddleware } from "@app/middlewares";
import errorHandler from "@app/middlewares/errorHandler";
import { HttpException } from "@app/exceptions";
// import Sequelize from "@app/bootstrap/sequelize";

const app: Application = express();

const App = async (): Promise<Application> => {
  try {
    await applyMiddleware(app);
    app.use(errorHandler);
    // await Sequelize.authenticate();
    return app;
  } catch (e: any) {
    throw new HttpException(`Error while starting the server : ${e.message}`);
  }
};

export default App;
