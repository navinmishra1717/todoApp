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

// type FormKeys = 'name' | 'description';

const AddTodo: React.FC<Props> = ({ addTodo }) => {
    const [formData, setFormData] = useState<ITodo | {}>();
    const [open, setOpen] = React.useState(false);
    // const [errors, setErrors] = useState({
    //     name: {
    //         val: false,
    //         message: 'name is required'
    //     },
    //     description: {
    //         val: false,
    //         message: 'description is required'
    //     }
    // });

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

        // const formFields = Object.keys(formData || ({} as ITodo));
        // const newFormData: any = formData as ITodo;

        // for (let index = 0; index < formFields.length; index++) {
        //     const currentField = formFields[index] as FormKeys;
        //     const currentValue = newFormData[currentField];
        //     if (currentValue === '') {
        //         setErrors({
        //             ...errors,
        //             [currentField]: {
        //                 val: true,
        //                 message: `${currentField} is required`
        //             }
        //         });
        //     }
        // }
        // addTodo(formData);
        // handleClose();
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
                        // error={errors.name.val}
                        // helperText={errors.name.val && errors.name.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        placeholder="description"
                        type="text"
                        fullWidth
                        onChange={(e: any) => handleForm(e)}
                        // error={errors.description.val}
                        // helperText={errors.description.val && errors.description.message}
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
