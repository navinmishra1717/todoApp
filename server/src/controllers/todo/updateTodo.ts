import { Request, Response, NextFunction } from "express";
import { sanitize } from "@app/libs/sanitize";
import { BadRequestException } from "@app/exceptions";

async function validateCreateTodoRequest(req: Request) {
  const { title, description } = req.body;
  if (!title) {
    throw new BadRequestException("Title is required");
  }
  if (!description) {
    throw new BadRequestException("Description is required");
  }

  return {
    title: sanitize(title),
  };
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {} = validateCreateTodoRequest(req);

    // const newTodo = await Todo.create(todo);
    return res.status(201).json({});
  } catch (error) {
    next(error);
  }
}
