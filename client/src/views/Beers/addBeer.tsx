import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, useMediaQuery, useTheme, TextField, DialogActions, Button, Avatar } from '@mui/material';
import { CustomButton } from '../../components/CustomButton';
import { AddBeerDialogProps, BeerFormValue } from '../../types/beer';
import beerImage from '../../assets/images/beer-image.png';

const AddBeer = (props: AddBeerDialogProps) => {
    const { onClose, onSubmit, open } = props;

    const [values, setValues] = useState<BeerFormValue>({
        name: '',
        tagline: '',
        description: ''
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = (e: any) => {
        onClose();
        setValues({});
    };

    const handleSave = (e: any) => {
        onSubmit(values);
        setValues({});
    };

    const handleValueChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
            <DialogTitle variant="h5">Add a New Beer</DialogTitle>
            <DialogContent>
                <Avatar
                    alt="beer image"
                    src={beerImage}
                    variant="square"
                    sx={{ width: 100, height: 120, border: '1px solid #d4d4d4', borderRadius: '4px', marginBottom: '4px' }}
                />
                <TextField
                    id="name"
                    name="name"
                    label="Beer name*"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={values.name}
                    onChange={(e: any) => handleValueChange(e)}
                />
                <TextField
                    id="genre"
                    name="tagline"
                    label="Genre*"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={values.tagline}
                    onChange={(e: any) => handleValueChange(e)}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description*"
                    value={values.description}
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e: any) => handleValueChange(e)}
                    sx={{ marginTop: '8px' }}
                />
            </DialogContent>
            <DialogActions sx={{ paddingRight: '24px', paddingBottom: '12px' }}>
                <Button onClick={handleClose} sx={{ color: 'gray', marginRight: '24px', textTransform: 'none' }}>
                    Cancel
                </Button>
                <CustomButton onClick={handleSave}>Save</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddBeer;
