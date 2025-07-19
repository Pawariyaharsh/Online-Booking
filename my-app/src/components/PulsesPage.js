import React from 'react';
import CategoryPage from './CategoryPage';

const pulsesProducts = [
  { name: 'Lentils', price: 205, img: 'lentils.png' },
  { name: 'Chickpeas', price: 100, img: 'chickpeas.png' },
  { name: 'Pinto Beans', price: 55, img: 'pinto.png' },
  { name: 'Soybeans', price: 50, img: 'soybeans.png' },
  { name: 'Rajma', price: 85, img: 'rajma.png' },
  { name: 'Massoor Dal', price: 100 , img: 'massor.png' },
  { name: 'Toor Dal', price: 115, img: 'toor.png' },
  { name: 'Split', price: 90, img: 'split.png' },
  { name: 'Navy Beans', price: 80, img: 'navy.png' },
  { name: 'Mung Dal', price: 90, img: 'mung.png' },
  
  
  
];

function PulsesPage() {
  return (
    <CategoryPage categoryName="Pulses" products={pulsesProducts} />
  );
}

export default PulsesPage;
