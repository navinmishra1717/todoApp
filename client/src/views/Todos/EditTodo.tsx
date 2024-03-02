import React, { useState } from 'react';
import { ITodo } from '../../types/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DialogTitle, TextField } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    todo: ITodo;
    updateFunction: (todo: ITodo) => void;
};

const EditTodo: React.FC<Props> = ({ open, setOpen, todo, updateFunction }) => {
    console.log(todo, 'todo');
    const [formData, setFormData] = useState<ITodo>(todo);
    const [errors, setErrors] = useState({
        name: false,
        description: false
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setErrors({
            name: false,
            description: false
        });
    };

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
        if (e.currentTarget.value === '') {
            setErrors({
                ...errors,
                [e.currentTarget.id]: true
            });
        } else {
            setErrors({
                ...errors,
                [e.currentTarget.id]: false
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFunction(formData);
        handleClose();
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Todo</DialogTitle>
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
                        error={errors.name}
                        helperText={errors.name && 'name is required'}
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
                        error={errors.description}
                        helperText={errors.description && 'description is required'}
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
                        disabled={errors.name || errors.description}
                        sx={{
                            padding: '0.5rem 1rem',
                            borderRadius: '16px',
                            ':hover': {
                                backgroundColor: 'rgb(151, 150, 150)'
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditTodo;
