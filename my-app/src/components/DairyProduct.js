// src/components/DairyProducts.js
import React from 'react';
import './DairyProduct.css';

function DairyProducts() {
  return (
    <div>
      <h1>Dairy Products</h1>
      <div className="product-categories">
        <div className="product-card">
          <h2>Milk</h2>
          <img src="milk.png" alt="Product 1" />
          <p>Rs. 79.99/-</p>
          <p>Quantity: 1 Lt</p>
          <button className="book-now-button">Book Now!</button>
        </div>
        <div className="product-card">
          <h2>Cheese</h2>
          <img src="cheese.png" alt="Product 1" />
          <p>Rs. 95.99/-</p>
          <p>Quantity: 1 Kg</p>
          <button className="book-now-button">Book Now!</button>
        </div>
        <div className="product-card">
          <h2>Butter</h2>
          <img src="butter.png" alt="Product 1" />
          <p>Rs. 83.99/-</p>
          <p>Quantity: 1 Kg</p>
          <button className="book-now-button">Book Now!</button>
        </div>
        <div className="product-card">
          <h2>Yoghurt</h2>
          <img src="yougart.png" alt="Product 1" />
          <p>Rs. 71.99/-</p>
          <p>Quantity: 1 Kg</p>
          <button className="book-now-button">Book Now!</button>
        </div>
        {/* Add more dairy products as needed */}
      </div>
    </div>
  );
}

export default DairyProducts;
