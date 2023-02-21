import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
    const { cart, setCart, setCartLength } = useContext(CartContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'))


    function Confirmar() {

        cart.forEach((item, index) => {
            const total = Number(item.quantity * item.price);
            console.log(item.size)
            fetch('http://localhost:8000/api/pedido', {
                method: "POST",
                body: JSON.stringify({
                    user_id: user.id,
                    product_id: item.id,
                    quantity: item.quantity,
                    size: item.size,
                    total: total

                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
                .then(res => {
                    return res.json();
                })
                .then(response => {

                    setCart([]);
                    alert('pedido registrado');
                    navigate('/');
                })
                .catch(error => {
                    console.error("Error:", error);
                });

        });

    }
    useEffect(() => {
        setCartLength(cart.length)
    }, [cart, setCartLength])
    const handleIncreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                console.log(item.quantity);
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }

        });

        setCart(updatedCart)
    }
    const handleQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    }
    const handleDelete = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }
    const handleSize = (event, id) => {

        const setSize = event.target.value;
        console.log(event.target.value)
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, size: setSize };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    };



    return (
        <div>
            <h1>Confirmar pedido: </h1>
            {cart.map((item, index) => (
                <table className='table' key={index}>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Talla</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>

                                <div className="input-group input-group-lg w-25 mx-auto">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantity(item.id)}>-</button>
                                    </div>
                                    <input type="number" className="form-control mx-auto" value={item.quantity || 1} readOnly />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    </div>
                                </div>

                            </td>
                            <td>
                                <select className="form-control" onChange={(e) => handleSize(e, item.id)} >
                                    <option selected="selected" value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>

                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            ))}
            <button className='btn btn-primary' onClick={Confirmar}>Confirmar</button>
        </div>
    );
}
