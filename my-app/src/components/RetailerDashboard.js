
import React, { useState, useEffect } from 'react';
import './RetailerDashboard.css';

function RetailerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    ProductID: '',
    ProductName: '',
    Category: '',
    Price: '',
    Stock: ''
  });
  const [updatedProduct, setUpdatedProduct] = useState({
    ProductID: '',
    ProductName: '',
    Category: '',
    Price: '',
    Stock: ''
  });
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('');
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const product = await response.json();
        setProducts([...products, product]);
        setNewProduct({
          ProductID: '',
          ProductName: '',
          Category: '',
          Price: '',
          Stock: ''
        });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      setError('Error adding product');
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/updateproduct', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedProduct, _id: selectedProductId }),
      });
      if (response.ok) {
        const result = await response.json();
        setProducts(products.map(product =>
          product._id === selectedProductId ? result : product
        ));
        setUpdatedProduct({
          ProductID: '',
          ProductName: '',
          Category: '',
          Price: '',
          Stock: ''
        });
        setSelectedProductId('');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      setError('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/deleteproduct', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setError('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProductId(product._id);
    setUpdatedProduct({
      ProductID: product.ProductID,
      ProductName: product.ProductName,
      Category: product.Category,
      Price: product.Price,
      Stock: product.Stock
    });
  };

  if (loadingProducts || loadingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Retailer Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddProduct}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={newProduct.ProductID}
          onChange={(e) => setNewProduct({ ...newProduct, ProductID: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.ProductName}
          onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.Category}
          onChange={(e) => setNewProduct({ ...newProduct, Category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.Price}
          onChange={(e) => setNewProduct({ ...newProduct, Price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.Stock}
          onChange={(e) => setNewProduct({ ...newProduct, Stock: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <form onSubmit={handleUpdateProduct}>
        <h3>Update Product</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={updatedProduct.ProductID}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, ProductID: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={updatedProduct.ProductName}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, ProductName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={updatedProduct.Category}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, Category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={updatedProduct.Price}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, Price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={updatedProduct.Stock}
          onChange={(e) => setUpdatedProduct({ ...updatedProduct, Stock: e.target.value })}
          required
        />
        <button type="submit">Update Product</button>
      </form>

      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div className="product-info">
              <span>Product ID: {product.ProductID}</span>
              <span>Product Name: {product.ProductName}</span>
              <span>Category: {product.Category}</span>
              <span>Price: Rs.{product.Price}</span>
              <span>Stock: {product.Stock}</span>
            </div>
            <button onClick={() => handleProductSelect(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div className="order-info">
              <span>Order ID: {order._id}</span>
              <span>Customer ID: {order.userId}</span>
              <span>Products: {order.items.map(item => (
                <span key={item._id}>{item.ProductName} (Qty: {item.quantity}), </span>
              ))}</span>
              <span>Total: Rs.{order.total}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetailerDashboard;

