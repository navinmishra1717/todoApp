import * as React from 'react';
// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AllBeerListPage from './allBeers';
import MyBeerListPage from './myBeers';

// ==============================|| BEER LIST PAGE ||============================== //

const BeerListPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, border: 'none' }}>
                    <TabList onChange={handleChange} aria-label="Beers page">
                        <Tab label="All Beers" value="1" />
                        <Tab label="My Beers" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AllBeerListPage />
                </TabPanel>
                <TabPanel value="2">
                    <MyBeerListPage />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default BeerListPage;
