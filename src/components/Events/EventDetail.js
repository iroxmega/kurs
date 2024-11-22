import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvent();
    }, [id]);

    if (!event) return <Typography>Event with this id is not found</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {event.title}
            </Typography>
            <Typography variant="body1">{event.description}</Typography>
            <Typography variant="body2">Date: {new Date(event.date).toLocaleString()}</Typography>
            <Typography variant="body2">Location: {event.location}</Typography>
            <Typography variant="body2">Tickets Left: {event.totalTickets}</Typography>
            <Button
                component={Link}
                to={`/purchase-ticket/${event.id}`}
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                disabled={event.totalTickets <= 0}
            >
                Purchase Ticket
            </Button>
        </Container>
    );
};

export default EventDetail;
