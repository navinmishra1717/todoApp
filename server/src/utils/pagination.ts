import { BadRequestException } from '@app/exceptions';
import { Request } from 'express';

export interface PaginationArgs {
  limit: number;
  skip: number;
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export default class Pagination {
  static validate(req: Request) {
    if (req.query.page && Number(req.query.page) < 1) {
      throw new BadRequestException('Invalid page value');
    }

    if (req.query.perPage && Number(req.query.perPage) < 1) {
      throw new BadRequestException('Invalid perPage value');
    }

    const { perPage = 10, page = 1 } = req.query;
    const limit = perPage ? parseInt(perPage as string, 10) : 10;
    const skip = page ? (+page - 1) * limit : 0;
    return {
      limit,
      skip,
      perPage: Number(perPage),
      page: Number(page),
    };
  }

  static totalPage(count: number, limit: number) {
    return Math.ceil(count / limit);
  }
}
