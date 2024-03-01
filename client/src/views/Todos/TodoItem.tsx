import React from 'react';
import { ITodo, TodoProps, TodoStatus } from '../../types/todo';

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void;
    deleteTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    // const checkTodo: string = todo.status === TodoStatus.DONE ? `line-through` : '';
    return (
        <div className="Card">
            <div className="Card-text">
                <h1>{todo.name}</h1>
                <span>{todo.description}</span>
            </div>

            <div className="Card-button">
                <button onClick={() => updateTodo(todo)} className={'Card-button__done'}>
                    {todo.status}
                </button>
                {/* <button onClick={() => updateTodo(todo)} className={'Card-button__done'}>
                    Complete
                </button> */}
                <button onClick={() => deleteTodo(todo._id)} className="Card-button__delete">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
