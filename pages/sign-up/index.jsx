'use client'
import React, { useState } from 'react';
import "./style.css";
import Header from '../../app/components/Header';
import { auth, provider, signInWithPopup } from '../../config/firebase';
const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google sign-in successful:', result.user);
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        // Handle form submission logic here
        console.log('Form submitted:', formData);

        try {
            const res = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            const data = await res.json();
            setSuccess(data.message);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="sign-up-form">
                <h2 className='head'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='us' htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='email' htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='password-container'>
                        <label className='password' htmlFor="password">Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type='button' className='toggle-password' onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div>
                        <label className='mobile' htmlFor="mobile">Mobile.No:</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='address' htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className='button'>Sign Up</button>
                    <button type="button" className="google-signin-button" onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;