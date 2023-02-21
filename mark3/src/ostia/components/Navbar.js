import React, { useContext } from 'react';
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
    return (
        <nav className="navBar">
            <ul>
                <li id='logo'><Link to="/">Home</Link></li>
                <li><Link to='/invierno'>Outfits Invierno</Link></li>
                <li><Link to="/verano">Outfits Verano</Link></li>
                <li><Link to="/primavera">Outfits EntreTiempo</Link></li>
                <li><a href="/accesorios">Accesorios</a></li>
                {
                    <>

                        {user ? <li className='userloged' onClick={Logout}><Link to="/">Logout</Link> </li> : <li className='userloged'><Link to="/login">Login</Link></li>}
                        {user ? <li className='userloged'><Link to="/cart">🛒</Link><span>{cartLength}</span></li> : <li className='userloged'><Link to="/register">Sign in</Link></li>}
                        {user ? <li className='userloged'>¡Bienvenido, {user.name}!</li> : <li className='userloged'>Registrate ➪</li>}
                    </>
                }
            </ul>
        </nav>
    )

}
