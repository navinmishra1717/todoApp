import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../API';
import { ITodos, ITodo, TodoStatus } from '../../types/todo';
import { SelectChangeEvent } from '@mui/material';
import SelectTodoStatus from './SelectTodoStatus';

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodos>({
        items: [],
        total: 0
    });

    const [selectStatus, setSelectStatus] = useState<TodoStatus>();

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setSelectStatus(event.target.value as TodoStatus);
    };

    useEffect(() => {
        fetchTodos(selectStatus);
    }, [selectStatus]);

    const fetchTodos = async (status?: string): Promise<void> => {
        try {
            const response = await getTodos(status);
            setTodos(response.data.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleSaveTodo = async (e: React.FormEvent, formData: ITodo): Promise<void> => {
        e.preventDefault();
        try {
            const response = await addTodo(formData);
            setTodos({ ...todos, items: [...todos.items, response.data.data] });
        } catch (error: any) {
            console.error('Error adding todo:', error);
        }
    };

    const handleUpdateTodo = async (todo: ITodo): Promise<void> => {
        console.log(todo, 'todo');
        try {
            const response = await updateTodo(todo);
            setTodos({ ...todos, items: todos.items.map((t) => (t._id === todo._id ? response.data.data : t)) });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (_id: string): Promise<void> => {
        try {
            await deleteTodo(_id);
            setTodos({ ...todos, items: todos.items.filter((todo: ITodo) => todo._id !== _id) });
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="App">
            <h1>My Todos</h1>
            <div className="Card-header">
                <AddTodo addTodo={handleSaveTodo} />
                <SelectTodoStatus selectStatus={selectStatus} handleChangeStatus={handleChangeStatus} />
            </div>
            {todos.items?.map((todo: ITodo) => (
                <TodoItem key={todo._id} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo} todo={todo} />
            ))}
        </div>
    );
};

export default TodoPage;
