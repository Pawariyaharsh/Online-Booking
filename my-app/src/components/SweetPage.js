import React from 'react';
import CategoryPage from './CategoryPage';

const sweets = [
  { name: 'Gulab Jamun', price: 120, img: 'gulabjamun.png' },
  { name: 'Ras Gulla', price: 35, img: 'rasgulla.png' },
  { name: 'Chhiki', price: 20, img: 'chikki.png' },
  { name: 'Jalebi', price: 15, img: 'jalebi.png' },
  { name: 'Laddu', price: 30, img: 'laddu.png' },
  { name: 'Kaju Katli', price: 35, img: 'kaju.png' }
];

function SweetPage() {
  return (
    <CategoryPage categoryName="Sweets" products={sweets} />
  );
}

export default SweetPage;
