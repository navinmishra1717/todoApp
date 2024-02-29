import { Request, Response, NextFunction } from 'express';
import { SanitizeType, sanitize } from '@app/libs/sanitize';
import { BadRequestException } from '@app/exceptions';
import { TodoStatus } from '@app/models/todo/types';
import todoService from '@app/services/todoService';
import { isMongoId } from '@app/utils/mongoHelper';

function validateUpdateTodoStatusRequest(req: Request) {
  const { status } = req.body;

  if (!status) {
    throw new BadRequestException('Status is required');
  }

  const sanitizedId = sanitize(req.params.id, [SanitizeType.trim]);
  const sanitizedStatus = sanitize<TodoStatus>(status, [SanitizeType.uppercase]);

  if (!isMongoId(sanitizedId)) {
    throw new BadRequestException('Invalid mongo id');
  }

  if (!Object.values(TodoStatus).includes(sanitizedStatus)) {
    throw new BadRequestException('Invalid status');
  }

  return {
    id: sanitizedId,
    status: sanitizedStatus,
  };
}

/**
 * update todo status
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {NextFunction} next next function
 * @returns updated todo status
 */
export async function updateTodoStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, status } = validateUpdateTodoStatusRequest(req);

    const newTodo = await todoService.updateTodoStatus(id, status);

    return res.status(200).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
