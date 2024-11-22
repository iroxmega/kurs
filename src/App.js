// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import PurchaseTicketPage from './pages/PurchaseTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';


function App() {
    return (
        <Router>

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/purchase-ticket/:id" element={<PurchaseTicketPage />} />
                <Route path="/my-tickets" element={<MyTicketsPage />} />
            </Routes>

        </Router>
    );
}

export default App;
