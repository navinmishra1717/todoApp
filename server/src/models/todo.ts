import { Document, Model, Schema, model } from 'mongoose';

export interface ITodo {
  title: string;
  description: string;
}

export type TodoDocument = ITodo & Document;

interface ITodoModel extends Model<TodoDocument> {}

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const todoModel: ITodoModel = model<TodoDocument, ITodoModel>('Todo', schema);
