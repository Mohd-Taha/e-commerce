"use client"
import React, { useState } from 'react';
import Header from '../../components/Header';
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import './style.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent!');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('Error sending password reset email. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <div className="forgot-password-form">
                <h2 className='head'>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="button">Send Reset Email</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;