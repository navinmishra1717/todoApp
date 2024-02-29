import { ITodoInput, TodoFilterParam, TodoSortParam, TodoStatus } from '@app/models/todo/types';
import { Todo } from '@app/models/todo';
import { OrderBy, PaginationArgs } from '@app/utils/pagination';
import { BadRequestException, NotFoundException } from '@app/exceptions';

interface TodoSearchOption extends PaginationArgs {
  filter: TodoFilterParam;
  sort: TodoSortParam;
}

class TodoService {
  async createTodo(data: ITodoInput) {
    const todo = await Todo.create(data);
    return todo;
  }

  async findPaginatedTodos(searchOptions: TodoSearchOption) {
    const { limit, skip, filter, sort } = searchOptions;
    try {
      const sortQuery: { [key: string]: any } = {};
      const filterQuery: { [key: string]: any } = {};

      if (filter.status) {
        filterQuery.status = filter.status;
      }

      if (sort.date) {
        sortQuery.addedDate = sort.date === OrderBy.ASC ? 1 : -1;
        sortQuery.addedTime = sort.date === OrderBy.ASC ? 1 : -1;
      }

      const [todos, total] = await Promise.all([
        Todo.find(filterQuery).sort(sortQuery).skip(skip).limit(limit),
        Todo.countDocuments(filterQuery),
      ]);
      return {
        data: todos,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllTodos() {
    try {
      const todos = await Todo.find().sort({
        createdAt: -1,
      });
      return todos;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(id: string, data: Partial<ITodoInput>) {
    try {
      const todo = await Todo.findById(id);
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, data, { new: true });
      return updatedTodo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodoStatus(id: string, status: TodoStatus) {
    try {
      const exists = await Todo.findById(id);
      if (!exists) {
        throw new BadRequestException('Todo not found');
      }
      const todo = await Todo.findOneAndUpdate({ _id: id }, { status }, { new: true });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: string) {
    try {
      const todo = await Todo.findById(id);
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      await Todo.deleteOne({ _id: id });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findTodoById(id: string) {
    const todo = await Todo.findOne({ _id: id });
    return todo;
  }
}

export default new TodoService();
