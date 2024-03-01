import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Moment from 'moment';
import { ITodo, TodoProps, TodoStatus } from '../../types/todo';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void;
    deleteTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleDeleteTodo = () => {
        deleteTodo(todo._id);
        handleCloseDelete();
    };

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
                    <button className="Card-button__delete" onClick={handleOpenDelete}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this todo?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteTodo}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TodoItem;
