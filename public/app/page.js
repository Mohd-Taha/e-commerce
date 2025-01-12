// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/app/page.js
'use client'
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { auth, provider, signInWithPopup } from '../config/firebase';
import './components/style.css';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google sign-in successful:', result.user);
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="home">
                <h1 className="home-title">Welcome to Our Store</h1>
                <button className="google-signin-button" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}