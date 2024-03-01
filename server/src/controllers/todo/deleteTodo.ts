import { NextFunction, Request, Response } from 'express';
import { SanitizeType, sanitize } from '@app/libs/sanitize';
import { isMongoId } from '@app/utils/mongoHelper';
import { BadRequestException } from '@app/exceptions';
import todoService from '@app/services/todoService';

function validateDeleteTodoRequest(req: Request) {
  const sanitizedId = sanitize(req.params.id, [SanitizeType.trim]);
  if (!isMongoId(sanitizedId)) {
    throw new BadRequestException('Invalid mongo id');
  }

  return {
    id: sanitizedId,
  };
}

/**
 * delete todo
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {NextFunction} next next function
 * @returns
 */
export async function deleteTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = validateDeleteTodoRequest(req);
    await todoService.deleteTodo(id);
    return res.status(200).json({
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
