import { Request, Response, NextFunction } from 'express';
import { SanitizeType, sanitize } from '@app/libs/sanitize';
import { BadRequestException } from '@app/exceptions';
import todoService from '@app/services/todoService';
import { isMongoId } from '@app/utils/mongoHelper';
import { TodoStatus } from '@app/models/todo/types';

function validateUpdateTodoStatusRequest(req: Request) {
  const { name, description, status } = req.body;

  const sanitizedId = sanitize(req.params.id, [SanitizeType.trim]);

  let sanitizedStatus;

  if (status) {
    sanitizedStatus = sanitize<TodoStatus>(status, [SanitizeType.uppercase]);
    if (!Object.values(TodoStatus).includes(sanitizedStatus)) {
      throw new BadRequestException('Invalid status');
    }
  }

  if (!isMongoId(sanitizedId)) {
    throw new BadRequestException('Invalid mongo id');
  }

  return {
    id: sanitizedId,
    ...(name && { name: sanitize(name) }),
    ...(description && { description: sanitize(description) }),
    ...(sanitizedStatus && { status: sanitizedStatus }),
  };
}

/**
 * update todo
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {NextFunction} next next function
 * @returns updated todo
 */
export async function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name, description, status } = validateUpdateTodoStatusRequest(req);

    const newTodo = await todoService.updateTodo(id, {
      name,
      description,
      status,
    });

    return res.status(200).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
