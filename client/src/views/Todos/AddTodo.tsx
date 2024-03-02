import React, { useState } from 'react';
import { ITodo } from '../../types/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DialogTitle, TextField } from '@mui/material';

type Props = {
    addTodo: (formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ addTodo }) => {
    const [formData, setFormData] = useState<ITodo | any>({
        name: '',
        description: ''
    });
    const [open, setOpen] = React.useState(false);
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
        setFormData({
            name: '',
            description: ''
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;
        Object.keys(formData).map((key: string) => {
            if (formData[key] === '') {
                hasError = true;
                setErrors({
                    ...errors,
                    [key]: true
                });
            }
        });
        if (!hasError) {
            addTodo(formData);
            handleClose();
        }
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
                <DialogTitle>Add Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        label="name"
                        variant="outlined"
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        inputProps={{ maxLength: 60 }}
                        onChange={(e: any) => handleForm(e)}
                        error={errors.name}
                        helperText={errors.name && 'name is required'}
                    />
                    <TextField
                        label="description"
                        variant="outlined"
                        margin="dense"
                        id="description"
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

export default AddTodo;
