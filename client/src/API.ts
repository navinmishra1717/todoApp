import axios, { AxiosResponse } from 'axios';
import { ApiDataType, DeleteApiDataType, ITodo, ListApiDataType, TodoStatus } from './types/todo';
import { baseUrl } from './config';

export const getTodos = async (status?: string): Promise<AxiosResponse<ListApiDataType>> => {
    try {
        const todos: AxiosResponse<ListApiDataType> = await axios.get(`${baseUrl}/todos${status ? `?status=${status}` : ''}`);
        return todos;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, '_id'> = {
            name: formData.name,
            description: formData.description,
            status: TodoStatus.UPCOMING,
            addedDate: formData.addedDate,
            addedTime: formData.addedTime
        };
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(baseUrl + '/todo', todo);
        return saveTodo;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateTodoStatus = async (id: string, status: TodoStatus): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, 'status'> = {
            status
        };
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/todo/status/${id}`, todoUpdate);
        return updatedTodo;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, 'name' | 'description' | 'addedDate' | 'addedTime'> = {
            name: todo.name,
            description: todo.description,
            addedDate: todo.addedDate,
            addedTime: todo.addedTime
        };
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/todo/${todo._id}`, todoUpdate);
        return updatedTodo;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteTodo = async (_id: string): Promise<AxiosResponse<DeleteApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/todo/${_id}`);
        return deletedTodo;
    } catch (error: any) {
        throw new Error(error);
    }
};
