import React, { useEffect, useState } from 'react';

// mui imports
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';

// project imports
import { Beer } from '../../types/beer';
import BeersList from './beersList';

const AllBeerListPage = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [beers, setBeers] = useState<Beer[]>([]);

    useEffect(() => {
        fetchAllBeers();
    }, [page, perPage]);

    const handleLoadMore = (e: any) => {
        setPage(page + 1);
    };

    const fetchAllBeers = async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}
            `);
            const data = await response.json();
            setBeers([...beers, ...data]);
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching beer list:', error);
        }
    };

    return loading ? (
        <Box sx={{ display: 'flex' }} className="loading">
            <CircularProgress />
        </Box>
    ) : beers.length ? (
        <>
            <BeersList beers={beers} />
            <Grid display="flex" alignContent="center" justifyContent="center" marginTop="12px">
                <Button
                    sx={{
                        color: '#3687D0',
                        textTransform: 'none'
                    }}
                    onClick={handleLoadMore}
                >
                    <Typography>Load More</Typography>
                    <KeyboardArrowDownIcon />
                </Button>
            </Grid>
        </>
    ) : null;
};

export default AllBeerListPage;
