import { NextFunction, Router } from 'express';
// import swaggerUi from "swagger-ui-express";
// import apiSpec from "../swagger-doc.json";

import * as TodoController from '../controllers/todo';

export const router = Router();

// Test routes
router.get('/', (req, res, next) => {
  res.send('health check');
});

// Book routes
router.post('/todo', TodoController.createTodo);
router.put('/todo/status/:id', TodoController.updateTodoStatus);
router.put('/todo/:id', TodoController.updateTodo);
router.get('/todos', TodoController.findTodos);
router.delete('/todo/:id', TodoController.deleteTodo);

router.use('/*', (req, res, next) => {
  res.status(404).send('Route not found');
});

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
  //   router.use("/dev/api-docs", swaggerUi.serve);
  //   router.get("/dev/api-docs", swaggerUi.setup(apiSpec));
}