import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
        <div className="container">
            <NavLink to='/' className="brand-logo left">MDT CURD UI</NavLink>
            <ul className="right">
                <li><NavLink to='/createpod'>New Pod</NavLink></li>
                <li><NavLink to='/'>Home</NavLink></li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar

