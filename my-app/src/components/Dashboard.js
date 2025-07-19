
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Dashboard.css';

function Dashboard() {
  const { user, setUser } = useAuth(); 
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ fullName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUpdatedUser({ fullName: user.fullName, email: user.email });
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const {fullName, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [fullName]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        const result = await response.json();
        // Update user state with the response data
        setUser(result.user);
        setEditing(false);
      } else {
        console.error('Error updating user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleQuickBook = () => {
    navigate('/products'); // Adjust path to your ProductPage route
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="profile-section">
        <h3>Profile Information</h3>
        {editing ? (
          <div className="profile-edit">
            <input
              type="text"
              name="fullName"
              value={updatedUser.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <button onClick={handleSave} className='changer'>Save</button>
          </div>
        ) : (
          <div className="profile-view">
            <p>Name: {user?.fullName}</p>
            <p>Email: {user?.email}</p>
            <button onClick={() => setEditing(true)} className='changer'>Edit</button>
          </div>
        )}
      </div>
      <div className="products-section">
        <h3 className='center'>Products</h3>
        <button onClick={handleQuickBook} className="quick-book-button">
          Quick Book!
        </button>
        <div className="products-cards">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h4>{product.ProductName}</h4>
              <p>Category: {product.Category}</p>
              <p>Price: {product.Price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


