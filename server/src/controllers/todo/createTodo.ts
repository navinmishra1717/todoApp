import { BadRequestException } from '@app/exceptions';
import { sanitize } from '@app/libs/sanitize';
import { todoModel } from '@app/models/todo';
import { Request, Response, NextFunction } from 'express';

async function validateCreateTodoRequest(req: Request) {
  const { title, description } = req.body;
  if (!title) {
    throw new BadRequestException('Title is required');
  }
  if (!description) {
    throw new BadRequestException('Description is required');
  }

  return {
    title: sanitize(title),
    description: sanitize(description),
  };
}

export async function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description } = await validateCreateTodoRequest(req);

    const newTodo = await todoModel.create({
      title,
      description,
    });
    return res.status(201).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
