import cors from 'cors';
import express, { Application } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const applyMiddleware = async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // any other middlewares here...
};
