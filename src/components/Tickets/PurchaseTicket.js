// src/components/Tickets/PurchaseTicket.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

const PurchaseTicket = () => {
    const { id } = useParams();
    console.log(id)
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

    if (!event) return <Typography>Мероприятия с указанным id не найдено.</Typography>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
                Покупка билета на {event.title}
            </Typography>
            <CheckoutForm eventId={id} />
        </Container>
    );
};

export default PurchaseTicket;
