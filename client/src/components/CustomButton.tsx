import { Button as MuiButton } from '@mui/material';
import styled from 'styled-components';

export const CustomButton = styled(({ ...otherProps }) => <MuiButton {...otherProps} />)`
    background-color: #0066c3;
    color: white;
    text-transform: none;
    transition: 0.2s ease;

    &:hover {
        background-color: blue;
    }
`;
