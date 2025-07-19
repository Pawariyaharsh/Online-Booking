import React from 'react';
import CategoryPage from './CategoryPage';

const dairyProducts = [
  { name: 'Milk', price: 20, img: 'milk.png' },
  { name: 'Cheese', price: 25, img: 'cheese.png' },
  { name: 'Yoghurt', price: 20, img: 'yougart.png' },
  { name: 'Butter', price: 25, img: 'butter.png' },
  { name: 'Ghee', price: 40, img: 'ghee.png' }
];

function DairyProductsPage() {
  return (
    <CategoryPage categoryName="Dairy Products" products={dairyProducts} />
  );
}

export default DairyProductsPage;
