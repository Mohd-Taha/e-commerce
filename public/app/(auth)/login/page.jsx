"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert ('Form submitted:', formData);
        alert('Form submitted');
    };
    const handleForgotPassword = (e) => {
        router.push('/forgot-password');
        // console.log('Forgot password clicked');
        alert('Redirecting to forgot password page');
    };
    return (
        <div>
            <Header />
            <div className="login-form">
                <h2 className='head'>Login</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='btn'>
                        <button type="submit" className="button">Login</button>
                    </div>
                <button className="forgot-password-link" onClick={handleForgotPassword}>
                    Forgot Password?
                </button>
                </form>
            </div>
        </div>
    );
};

export default Login;