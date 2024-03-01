import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@app/exceptions';
import { sanitize, sanitizeDate } from '@app/libs/sanitize';
import { TodoDto } from '@app/models/todo/types';
import todoService from '@app/services/todoService';

async function validateCreateTodoRequest(req: Request) {
  const { name, description } = req.body;
  if (!name) {
    throw new BadRequestException('name is required');
  }
  if (!description) {
    throw new BadRequestException('description is required');
  }

  if (name.length > 40) {
    throw new BadRequestException('name must be less than 40 characters');
  }

  return {
    name: sanitize(name),
    description: sanitize(description),
  };
}

/**
 * create todo
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {NextFunction} next next function
 * @returns created todo with status
 */

export async function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description } = await validateCreateTodoRequest(req);

    const newTodo: TodoDto = await todoService.createTodo({ name, description });

    return res.status(201).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
