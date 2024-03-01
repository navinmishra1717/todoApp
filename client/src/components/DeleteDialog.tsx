import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteId: string;
    deletefunction: (_id: string) => void;
}
export function DeleteDialog({ open, setOpen, deletefunction, deleteId }: Props) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAction = () => {
        deletefunction(deleteId);
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleDeleteAction}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}
