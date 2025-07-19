// src/components/GrainsPage.js
import React, { useState, useEffect } from 'react';
import './CategoryPage.css'; // Assuming you have some CSS file for category pages

const GrainsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/category/grains');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching grains:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="category-page">
      <h1>Grains</h1>
      <div className="category-products">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.img} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Price: Rs.{product.price}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrainsPage;
