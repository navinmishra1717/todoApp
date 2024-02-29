import { Request, Response, NextFunction } from 'express';
import { SanitizeType, sanitize, sanitizeDate } from '@app/libs/sanitize';
import { BadRequestException } from '@app/exceptions';
import todoService from '@app/services/todoService';
import { isMongoId } from '@app/utils/mongoHelper';

function validateUpdateTodoStatusRequest(req: Request) {
  const { name, description, addedDate, addedTime } = req.body;

  const sanitizedId = sanitize(req.params.id, [SanitizeType.trim]);

  if (!isMongoId(sanitizedId)) {
    throw new BadRequestException('Invalid mongo id');
  }

  return {
    id: sanitizedId,
    ...(name && { name: sanitize(name) }),
    ...(description && { description: sanitize(description) }),
    ...(addedDate && { addedDate: sanitizeDate(addedDate) }),
    ...(addedTime && { addedTime: sanitize(addedTime) }),
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
    const { id, name, description, addedDate, addedTime } = validateUpdateTodoStatusRequest(req);

    const newTodo = await todoService.updateTodo(id, {
      name,
      description,
      addedDate,
      addedTime,
    });

    return res.status(200).json({
      data: newTodo,
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
