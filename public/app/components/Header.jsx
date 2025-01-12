'use client'
import Link from "next/link"
import React,{ useState } from "react"
import "./style.css"
// import { link } from "@nextui-org/theme";
// import { toggle } from "@nextui-org/theme"
export default function Header(){
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const toggleMenu = ()=> {
        setIsMenuOpen(!isMenuOpen);
    };
    const menuList = [
        {
            name: "Home",
            link: "/",
            _id: 1
        },
        {
            name: "About Us",
            link: "/about-us",
            _id: 2,
        },
        {
            name: "Contact Us",
            link: "/contact-us",
            _id: 3,
        },
    ];
    return( 
    <nav className="header">
        <img className="logo" src="logo.png" alt="Logo" />
        <button className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {menuList.map((item) => (
  <Link key={item._id} href={item?.link}>
    <button>{item?.name}</button>
  </Link>
))}
        </div>
        <div className="auth-buttons">
        <Link href="/login">
        <button className="auth-button">Log In</button>
        </Link>
        <Link href="/sign-up">
        <button className="auth-button">Sign Up</button>
        </Link>
        </div>
    </nav>
    )
}