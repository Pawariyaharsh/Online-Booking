
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage({ categoryName, products }) {
  const { cart, addToCart, removeFromCart, total } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="category-products">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <img src={product.img} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Price: Rs.{product.price}</p>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                {item.name} - Rs.{item.price} x {item.quantity}
                <div>
                  <button className="cart-button" onClick={() => addToCart(item)}>+</button>
                  <button className="cart-button" onClick={() => removeFromCart(item)}>-</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cart-empty">Your cart is empty</p>
        )}
        <p>Total Price: Rs.{total}</p>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CategoryPage;
