import { BadRequestException } from '@app/exceptions';
import { sanitize } from '@app/libs/sanitize';
import { ITodo, todoModel } from '@app/models/todo';
import { Request, Response, NextFunction } from 'express';

async function validateCreateTodoRequest(req: Request) {
  const { title, description } = req.body;
}

export async function findTodos(req: Request, res: Response, next: NextFunction) {
  try {
    // const {} = validateCreateTodoRequest(req);

    const todos: ITodo[] = await todoModel.find({});
    const total = await todoModel.countDocuments({});
    return res.json({
      data: {
        items: todos,
        currentPage: 1,
        perPage: 5,
        total,
      },
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
