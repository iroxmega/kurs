import React from 'react';
import { Container, Typography } from '@mui/material';
const Home = () => {
    return <>
        <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 4 }}>
            Welcome to kurs!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
            Home Page
        </Typography>
    </Container>
        </>;
};

export default Home;
