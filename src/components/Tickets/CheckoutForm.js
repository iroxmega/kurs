// src/components/Tickets/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({eventId}) => { // Убедитесь, что используете правильный пропс
    console.log('CheckoutForm - eventId:', eventId); // Логируем eventId для отладки

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        setProcessing(true);
        setErrorMessage(null);

        try {
            // Извлечение токена из localStorage

            const token = localStorage.getItem('token'); // Убедитесь, что токен хранится под ключом 'token'
            console.log(token)
            if (!token) {
                setErrorMessage('Пользователь не авторизован.');
                setProcessing(false);
                return;
            }

            console.log('Sending eventId:', eventId); // Логируем eventId перед отправкой

            // Создание платежного намерения на сервере с заголовком авторизации
            const res = await axios.post(
                'http://localhost:5000/api/payments/create-payment-intent',
                { eventId }, // Убедитесь, что вы отправляете eventId
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { clientSecret } = res.data;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (paymentResult.error) {
                setErrorMessage(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    // Уведомление backend о успешном платеже
                    await axios.post(
                        'http://localhost:5000/api/tickets/purchase',
                        { eventId },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    setSucceeded(true);
                    alert('Билет успешно куплен');
                    navigate('/my-tickets');
                }
            }
        } catch (error) {
            console.error(error);
            // Получение подробной информации об ошибке
            const message =
                error.response?.data?.message ||
                error.response?.data?.error?.message ||
                error.message ||
                'Произошла неизвестная ошибка.';
            setErrorMessage(`Платёж не прошёл: ${message}`);
        }

        setProcessing(false);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Покупка билета
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {succeeded && <Alert severity="success">Платёж успешно завершён!</Alert>}
            <form onSubmit={handleSubmit}>
                <CardElement />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!stripe || processing || succeeded}
                    style={{ marginTop: '20px' }}
                >
                    {processing ? 'Обработка...' : 'Оплатить'}
                </Button>
            </form>
        </Container>
    );
};

export default CheckoutForm;
