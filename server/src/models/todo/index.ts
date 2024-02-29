import { Document, Model, Schema, model } from 'mongoose';
import { ITodoAttribute, TodoStatus } from './types';

export type TodoDocument = ITodoAttribute & Document;

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: TodoStatus, default: TodoStatus.UPCOMING },
    addedDate: { type: Date, required: true, default: new Date() },
    addedTime: { type: String, required: true },
  },
  {
    collection: 'todos',
    timestamps: true,
  }
);

export const Todo: Model<TodoDocument> = model<TodoDocument>('Todo', schema);
