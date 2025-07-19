import React from 'react';
import CategoryPage from './CategoryPage';

const beveragesProducts = [
  { name: 'Aam Panna', price: 25.0, img: 'aam.png' },
  { name: 'Jaljeera', price: 15.0, img: 'jal.png' },
  { name: 'Mango Lassi', price: 35.0, img: 'mango.png' },
  { name: 'Lassi', price: 30.0, img: 'lassi.png' },
  { name: 'Chai Masala', price: 20.0, img: 'chai.png' }
];

function BeveragesPage() {
  return (
    <CategoryPage categoryName="Beverages" products={beveragesProducts} />
  );
}

export default BeveragesPage;
