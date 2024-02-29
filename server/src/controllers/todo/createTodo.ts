import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@app/exceptions';
import { sanitize, sanitizeDate } from '@app/libs/sanitize';
import { TodoDto } from '@app/models/todo/types';
import todoService from '@app/services/todoService';

async function validateCreateTodoRequest(req: Request) {
  const { name, description, addedDate, addedTime } = req.body;
  if (!name) {
    throw new BadRequestException('Name is required');
  }
  if (!description) {
    throw new BadRequestException('Description is required');
  }
  if (!addedDate) {
    throw new BadRequestException('Added Date is required');
  }
  if (!addedTime) {
    throw new BadRequestException('Added Time is required');
  }

  return {
    name: sanitize(name),
    description: sanitize(description),
    addedDate: sanitizeDate(addedDate)!,
    addedTime: sanitize(addedTime),
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
    const { name, description, addedDate, addedTime } = await validateCreateTodoRequest(req);

    const newTodo: TodoDto = await todoService.createTodo({ name, description, addedDate, addedTime });

    return res.status(201).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
