import React, { useState } from 'react';
import { ITodo } from '../../types/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    todo: ITodo;
    updateFunction: (todo: ITodo) => void;
};

const EditTodo: React.FC<Props> = ({ open, setOpen, todo, updateFunction }) => {
    console.log(todo, 'todo');
    const [formData, setFormData] = useState<ITodo>(todo);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFunction(formData);
        handleClose();
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="name"
                        type="text"
                        value={formData.name || ''}
                        fullWidth
                        onChange={(e: any) => handleForm(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        placeholder="description"
                        value={formData.description || ''}
                        type="text"
                        fullWidth
                        onChange={(e: any) => handleForm(e)}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        onClick={handleClose}
                        color="error"
                        sx={{
                            padding: '0.5rem 1rem',
                            borderRadius: '16px',
                            ':hover': {
                                backgroundColor: 'rgb(151, 150, 150)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        sx={{
                            padding: '0.5rem 1rem',
                            borderRadius: '16px',
                            ':hover': {
                                backgroundColor: 'rgb(151, 150, 150)'
                            }
                        }}
                    >
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditTodo;
