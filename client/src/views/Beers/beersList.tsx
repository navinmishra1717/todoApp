import React from 'react';

// mui imports
import { Avatar, Card, CardContent, Fade, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { Beer } from '../../types/beer';
import beerImage from '../../assets/images/beer-image.png';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 120,
        backgroundColor: 'black'
    }
});

// Styled component for the Card
const CustomCard = styled(Card)`
    height: 200;
    box-shadow: 4px 8px 4px rgb(0, 0, 0, 0.05);
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        box-shadow: 0px 0px 0px rgb(0, 0, 0, 0);
        background-color: rgb(227, 241, 255);
    }
`;

const BeersList = ({ beers }: { beers: Beer[] }) => {
    return (
        <Grid container spacing={4}>
            {beers.map((beer: Beer, index: number) => (
                <Grid key={index} item xs={12} lg={6}>
                    <CustomCard>
                        <CardContent sx={{ paddingLeft: '0px' }}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <CustomWidthTooltip
                                        title="Ingredient: grain, hops, yeast, water"
                                        arrow
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 600 }}
                                        placement="top"
                                    >
                                        <Grid display="flex" sx={{ paddingTop: '16px', justifyContent: 'center' }}>
                                            <Avatar
                                                alt={`beer-${index}`}
                                                src={beer.image_url || beerImage}
                                                variant="square"
                                                sx={{
                                                    height: 140,
                                                    width: 34
                                                }}
                                            />
                                        </Grid>
                                    </CustomWidthTooltip>
                                </Grid>
                                <Grid
                                    item
                                    xs={10}
                                    sx={{
                                        paddingTop: '14px',
                                        paddingBottom: '8px'
                                    }}
                                >
                                    <Typography variant="h4" component="div">
                                        {beer.name}
                                    </Typography>
                                    <Typography sx={{ color: 'rgb(211, 169, 86)', marginTop: '6px' }}>{beer.tagline}</Typography>
                                    <Typography
                                        sx={{
                                            marginTop: '6px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {beer.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CustomCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default BeersList;
