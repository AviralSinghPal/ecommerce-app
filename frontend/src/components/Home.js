import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>

      <h2>Here are some Next Gen products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
