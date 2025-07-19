
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Productpage.css';

function ProductPage() {
  const navigate = useNavigate();

  const handleQuickBookClick = (productName) => {
    navigate(`/${productName.toLowerCase().replace(' ', '-')}`);
  };

  const products = [
    { name: 'Spices', img: 'product1.png' },
    { name: 'Dairy Products', img: 'product2.png' },
    { name: 'Pulses', img: 'product3.png' },
    { name: 'Beverages', img: 'product4.png' },
    { name: 'Sweets', img: 'swets.png' }
  ];

  return (
    <div>
      <main>
        <div className="product-header">
          <h1>Find the Best Product</h1>
          <input type="text" placeholder="Search for products..." className="search-bar" />
          <div className="product-image">
            <img src="product.png" alt="Product" />
          </div>
        </div>
        <div className="product-categories">
          {products.map((product) => (
            <div className="product-card" key={product.name}>
              <img src={product.img} alt={product.name} />
              <h4>{product.name}</h4>
              <button className="quick-book-button" onClick={() => handleQuickBookClick(product.name)}>Quick Book</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;

