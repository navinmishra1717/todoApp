import React, { useState } from 'react';
import { ITodo } from '../../types/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

type Props = {
    addTodo: (e: React.FormEvent, formData: ITodo | any) => void;
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

        console.log({ formData });
    };

    return (
        <React.Fragment>
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
                    <TextField autoFocus margin="dense" id="flat" label="Name" type="text" fullWidth />
                    <TextField autoFocus margin="dense" id="floor" label="Description" type="text" fullWidth />
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AddTodo;
