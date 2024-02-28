import { BadRequestException } from '@app/exceptions';
import { sanitize } from '@app/libs/sanitize';
import { ITodo } from '@app/models/todo';
import { Request, Response, NextFunction } from 'express';

async function validateCreateTodoRequest(req: Request) {
  const { title, description } = req.body;
}

export async function findTodos(req: Request, res: Response, next: NextFunction) {
  try {
    // const {} = validateCreateTodoRequest(req);

    const todos: ITodo[] = [];
    return res.json({
      data: {
        items: todos,
        currentPage: 1,
        perPage: 5,
        total: 0,
      },
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
