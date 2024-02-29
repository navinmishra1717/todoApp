import { ObjectId } from 'mongodb';

export function isMongoId(value: string) {
  return ObjectId.isValid(value);
}
