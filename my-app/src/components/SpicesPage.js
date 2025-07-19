import React from 'react';
import CategoryPage from './CategoryPage';

const spices = [
  { name: 'Black Pepper', price: 20, img: 'kalimirch.png' },
  { name: 'Garam Masala', price: 35, img: 'garammasala.png' },
  { name: 'Dalchini', price: 20, img: 'dalchini.png' },
  { name: 'Curry Leaves', price: 15, img: 'curry.png' },
  { name: 'Coriander', price: 30, img: 'coriander.png' },
  { name: 'Cloves', price: 35, img: 'cloves.png' },
  { name: 'Green Cardamon', price: 35, img: 'elaichi.png' },
  { name: 'Kasmiri Mirch', price: 20, img: 'kashmiri.png' },
  { name: 'Ajwain', price: 35, img: 'ajwain.png' },
  { name: 'Turmeric Powder', price: 25, img: 'haldi.png' },
  { name: 'Saffron', price: 60, img: 'saffron.png' }
];

function SpicesPage() {
  return (
    <CategoryPage categoryName="Spices" products={spices} />
  );
}

export default SpicesPage;
