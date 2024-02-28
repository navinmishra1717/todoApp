import {
  ObjectId,
  Model,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  PipelineStage,
  AnyKeys,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  MongooseQueryOptions,
} from 'mongoose';

abstract class BaseRepository<T> {
  private _model: Model<T>;
  constructor(_model: any) {
    this._model = _model;
  }

  async create(doc: AnyKeys<T> | T): Promise<T> {
    return this._model.create(doc);
  }
  async createMany(doc: T): Promise<any> {
    return await this._model.insertMany(doc);
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null
  ): Promise<T | null> {
    return this._model.findOne(filter, projection, options);
  }

  async findById(
    id: string,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null
  ): Promise<T | null> {
    return this._model.findById(id, projection, options);
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined
  ): Promise<T[]> {
    return this._model.find(filter, projection, options);
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: Omit<MongooseQueryOptions<T>, 'lean'>
  ) {
    return this._model.updateOne(filter, update, options);
  }

  async updateById(
    id: ObjectId | any,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T>
  ) {
    return this._model.findByIdAndUpdate(id, update, options);
  }

  async deleteOne(
    filter?: FilterQuery<T>,
    options?: Omit<MongooseQueryOptions<T>, 'timestamps' | 'lean'>
  ): Promise<any> {
    return this._model.deleteOne(filter, options);
  }

  async deleteById(id?: ObjectId | any, options?: QueryOptions<T>) {
    return this._model.findByIdAndDelete(id, options);
  }
}

export default BaseRepository;
