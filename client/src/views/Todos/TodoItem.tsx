import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Moment from 'moment';
import { ITodo, TodoProps, TodoStatus } from '../../types/todo';
import { DeleteDialog } from '../../components/DeleteDialog';

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void;
    deleteTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    const [openDelete, setOpenDelete] = React.useState(false);

    const crossTodo: string = todo.status === TodoStatus.DONE ? `line-through` : '';
    return (
        <>
            <div className="Card">
                <div className="Card-left">
                    <Checkbox
                        defaultChecked={todo.status === TodoStatus.DONE}
                        onChange={(e) => updateTodo({ ...todo, status: e.target.checked ? TodoStatus.DONE : TodoStatus.UPCOMING })}
                        sx={{
                            color: '#ff9900',
                            '&.Mui-checked': {
                                color: '#fff'
                            }
                        }}
                    />
                    <div className="Card-text">
                        <h2 className={crossTodo}>{todo.name}</h2>
                        <span>{todo.description}</span>
                        <span>{Moment(todo.createdAt).format('YYYY/MM/DD h:mm a')}</span>
                    </div>
                </div>

                <div className="Card-button">
                    <button onClick={() => updateTodo(todo)} className={'Card-button__done'}>
                        <EditIcon />
                    </button>
                    <button className="Card-button__delete" onClick={() => setOpenDelete(true)}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <DeleteDialog open={openDelete} setOpen={setOpenDelete} deleteId={todo._id} deletefunction={deleteTodo} />
        </>
    );
};

export default TodoItem;
