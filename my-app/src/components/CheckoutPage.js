

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

function CheckoutPage() {
  const { cart, total, setCart } = useContext(CartContext);
  const { user } = useAuth();

  const handleConfirmPurchase = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      user: user || { name: "Guest", email: "Not Provided" },
      items: cart,
      total
    };

    try {
      const response = await fetch('http://localhost:3000/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Purchase confirmed!');
        setCart([]); // Clear the cart
      } else {
        console.error('Failed to confirm purchase:', responseData.message);
        alert(`Failed to confirm purchase: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while confirming purchase. Check console for details.');
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>
      <div className="checkout-container">
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {user ? user.name : "Guest"}</p>
          <p>Email: {user ? user.email : "Not Provided"}</p>
        </div>
        <div className="checkout-summary">
          <h2>Cart Summary</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="product-info">
                    <img src={item.img} alt={item.name} />
                    <h4>{item.name}</h4>
                  </div>
                  <div className="product-quantity">
                    Rs.{item.price} x {item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cart-empty">Your cart is empty</p>
          )}
          <p className="total-price">Total Price: Rs.{total}</p>
          <button className="checkout-button" onClick={handleConfirmPurchase}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
