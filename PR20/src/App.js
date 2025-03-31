import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard';

function App() {
  const products = [
    {
      name: "Premium Wireless Headphones",
      price: 199.99,
      description: "High-quality wireless headphones with noise cancellation and premium sound quality."
    },
    {
      name: "Smart Watch Pro",
      price: 299.99,
      description: "Advanced smartwatch with health tracking, notifications, and long battery life."
    },
    {
      name: "Ultra HD Monitor",
      price: 399.99,
      description: "32-inch 4K display with HDR support and built-in speakers."
    }
  ];

  return (
    <div className="App">
      <h1>Product Showcase</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App; 