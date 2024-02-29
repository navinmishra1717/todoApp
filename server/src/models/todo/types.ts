import { OrderBy } from '@app/utils/pagination';

export enum TodoStatus {
  UPCOMING = 'UPCOMING',
  DONE = 'DONE',
}

export interface TodoFilterParam {
  status?: TodoStatus;
}

export interface TodoSortParam {
  date?: OrderBy;
}

export interface ITodoInput {
  name: string;
  description: string;
  addedDate: Date;
  addedTime: string;
}

export interface ITodoAttribute extends ITodoInput {
  _id: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoDto {
  _id: string;
  name: ITodoAttribute['name'];
  description: ITodoAttribute['description'];
  status: ITodoAttribute['status'];
  addedDate: ITodoAttribute['addedDate'];
  addedTime: ITodoAttribute['addedTime'];
}
