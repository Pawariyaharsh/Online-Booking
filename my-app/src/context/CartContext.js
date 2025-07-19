
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setTotal((prevTotal) => prevTotal + product.price);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct.quantity === 1) {
        return prevCart.filter(item => item.name !== product.name);
      } else {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
    setTotal((prevTotal) => prevTotal - product.price);
  };

  const deleteFromCart = (product) => {
    setCart((prevCart) => prevCart.filter(item => item.name !== product.name));
    setTotal((prevTotal) => prevTotal - (product.price * product.quantity));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, deleteFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
