import { SanitizeType, sanitize } from '@app/libs/sanitize';
import { TodoFilterParam, TodoSortParam, TodoStatus } from '@app/models/todo/types';
import todoService from '@app/services/todoService';
import Pagination, { OrderBy } from '@app/utils/pagination';
import { Request, Response, NextFunction } from 'express';

function validateFindTodosRequest(req: Request) {
  return {
    status: req.query.status ? sanitize<TodoStatus>(req.query.status, [SanitizeType.uppercase]) : undefined,
    all: req.query.all,
  };
}
/**
 * List all todos
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {NextFunction} next next function
 * @returns list of todos
 */
export async function findTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, all } = validateFindTodosRequest(req);

    if (all === 'true') {
      const data = await todoService.findAllTodos();
      return res.status(200).json({
        data: {
          items: data,
          total: data.length,
        },
        status: 'ok',
      });
    }

    const { limit, skip, page, perPage } = Pagination.validate(req);

    const filterParams: TodoFilterParam = {};

    const sortParams: TodoSortParam = {
      date: OrderBy.DESC,
    };

    if (status) {
      filterParams.status = status;
    }

    const { data, total } = await todoService.findPaginatedTodos({
      skip,
      limit,
      filter: filterParams,
      sort: sortParams,
    });

    return res.status(200).json({
      data: {
        items: data,
        currentPage: page,
        perPage,
        total,
      },
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
}
