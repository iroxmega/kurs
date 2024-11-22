import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{event.title}</Typography>
                                <Typography variant="body2">{event.description}</Typography>
                                <Typography variant="body2">Date: {new Date(event.date).toLocaleString()}</Typography>
                                <Typography variant="body2">Location: {event.location}</Typography>
                                <Typography variant="body2">Tickets Left: {event.totalTickets}</Typography>
                                <Button
                                    component={Link}
                                    to={`/events/${event.id}`}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EventList;
