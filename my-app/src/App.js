
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import ProductPage from './Productpage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import PulsesPage from './components/PulsesPage';
import BeveragesPage from './components/BeveragesPage';
import DairyProducts from './components/DairyProducts';
import SpicesPage from './components/SpicesPage'; 
import SweetPage from './components/SweetPage';
import GrainsPage from './components/GrainsPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Services from './components/Services';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLoginPage from './components/AdminLoginPage';
import RetailerDashboard from './components/RetailerDashboard';
import CheckoutPage from './components/CheckoutPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin-login" element={<AdminLoginPage />} /> 
              <Route path="/admin-dashboard" element={<RetailerDashboard />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/dairy-products" element={<DairyProducts />} />
              <Route path="/spices" element={<SpicesPage />} />
              <Route path="/pulses" element={<PulsesPage />} />
              <Route path="/beverages" element={<BeveragesPage />} />
              
              <Route path="/sweets" element={<SweetPage />} />
              <Route path="/grains" element={<GrainsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


