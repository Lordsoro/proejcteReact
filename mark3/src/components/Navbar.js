import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'))
    const { cartLength } = useContext(CartContext);

    function Logout() {
        localStorage.removeItem("user-info")
        navigate('/')
    }

    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="navBar">
            <div className="menuToggle" onClick={toggleMenu}>
                <div className="hamburger"></div>
            </div>
            <ul className={`navLinks ${showMenu ? 'show' : ''}`}>
                <li id='logo'><Link to="/">Home</Link></li>
                <li><Link to='/invierno'>Outfits Invierno</Link></li>
                <li><Link to="/verano">Outfits Verano</Link></li>
                <li><Link to="/primavera">Outfits EntreTiempo</Link></li>
                <li><a href="/accesorios">Accesorios</a></li>
                {user ? (
                    <>
                        <li className='userloged' onClick={Logout}><Link to="/">Logout</Link></li>
                        <li className='userloged'><Link to="/cart">🛒<span>{cartLength}</span></Link></li>
                        <li className='userloged'>¡Bienvenido, {user.name}!</li>
                    </>
                ) : (
                    <>
                        <li className='userloged'><Link to="/login">Login</Link></li>
                        <li className='userloged'><Link to="/register">Sign in</Link></li>
                        <li className='userloged'>Registrate ➪</li>
                    </>
                )}
            </ul>
        </nav>
    );
}
