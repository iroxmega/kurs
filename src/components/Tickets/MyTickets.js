import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tickets/my-tickets', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTickets(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTickets();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                My Tickets
            </Typography>
            <Grid container spacing={2}>
                {tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{ticket.Event.title}</Typography>
                                <Typography variant="body2">{ticket.Event.description}</Typography>
                                <Typography variant="body2">
                                    Date: {new Date(ticket.Event.date).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">Location: {ticket.Event.location}</Typography>
                                <Typography variant="body2">
                                    Purchase Date: {new Date(ticket.purchaseDate).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyTickets;
