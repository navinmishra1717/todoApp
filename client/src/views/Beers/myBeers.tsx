import React, { useEffect, useState } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { Beer } from '../../types/beer';
import styled from 'styled-components';
import AddBeer from './addBeer';
import { CustomButton } from '../../components/CustomButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import BeersList from './beersList';

const CustomLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;

const CustomFixedButton = styled(CustomButton)`
    position: fixed;
    right: 45px;
    top: 36px;
`;

const MyBeerListPage = () => {
    const [localBeers, setLocalBeers] = useLocalStorage('myBeers');
    const [myBeers, setMyBeers] = useState<Beer[]>(localBeers() || []);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setLocalBeers(myBeers);
    }, [setLocalBeers, myBeers]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (values: any) => {
        setMyBeers([...myBeers, values]);
        setOpen(false);
    };

    return (
        <Grid sx={{ position: 'relative' }}>
            <CustomFixedButton onClick={handleClickOpen}>Add a new beer</CustomFixedButton>
            {myBeers.length ? (
                <BeersList beers={myBeers} />
            ) : (
                <Grid container direction="column" marginTop="150px" alignItems="center">
                    <Typography>Nothing to see yet.</Typography>
                    <Typography>
                        <CustomLink onClick={handleClickOpen}>Click here</CustomLink> to add your first beer!
                    </Typography>
                </Grid>
            )}
            <AddBeer open={open} onClose={handleClose} onSubmit={handleSubmit} />
        </Grid>
    );
};

export default MyBeerListPage;
