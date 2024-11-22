import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        totalTickets: 0,
        price: 0,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Event created successfully');
            navigate('/events');
        } catch (error) {
            console.error(error);
            alert('Failed to create event');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    margin="normal"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Date"
                    name="date"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    margin="normal"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Total Tickets"
                    name="totalTickets"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={form.totalTickets}
                    onChange={handleChange}
                    required
                /><TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                margin="normal"
                value={form.price}
                onChange={handleChange}
                required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Event
                </Button>
            </form>
        </Container>
    );
};

export default CreateEvent;
