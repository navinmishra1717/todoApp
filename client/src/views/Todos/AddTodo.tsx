import React, { useState } from 'react';
import { ITodo } from '../../types/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

type Props = {
    addTodo: (formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ addTodo }) => {
    const [formData, setFormData] = useState<ITodo | {}>();
    const [open, setOpen] = React.useState(false);

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
        addTodo(formData);
        handleClose();
    };
    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: '#ff9900',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    ':hover': {
                        backgroundColor: '#8d590b'
                    }
                }}
            >
                Add Todo
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="name"
                        type="text"
                        fullWidth
                        onChange={(e: any) => handleForm(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        placeholder="description"
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
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddTodo;
