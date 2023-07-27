import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AdminPortal.css";
import ProductCard from "./ProductCard.js";

const AdminPortal = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updateProductData, setUpdateProductData] = useState({
    name: '',
    price: '',
    // Add other product properties here as needed
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // Fetch details of all products
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data); // Assuming the API returns an array of product data
      })
      .catch(error => {
        console.error('Error fetching product details:', error.message);
      });
  };

  const handleProductClick = (productId) => {
    // Fetch details of a specific product when clicked
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(response => {
        setSelectedProductId(productId);
        setUpdateProductData(response.data); // Assuming the API returns product details for the given ID
      })
      .catch(error => {
        console.error('Error fetching product details:', error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProductData({
      ...updateProductData,
      [name]: value,
    });
  };

  const handleUpdateProduct = () => {
    console.log(updateProductData);
    axios.put(`http://localhost:5000/api/products/${selectedProductId}`, updateProductData)
      .then(() => {
        fetchProducts(); // Refresh the product list after updating
        setSelectedProductId(null); // Clear the selected product after update
        setUpdateProductData({
          name: '',
          price: '',
          // Add other product properties here as needed
        });
      })
      .catch(error => {
        console.error('Error updating product:', error.message);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:5000/api/products/${productId}`)
      .then(() => {
        fetchProducts(); // Refresh the product list after deletion
        setSelectedProductId(null); // Clear the selected product after deletion
        setUpdateProductData({
          name: '',
          price: '',
          // Add other product properties here as needed
        });
      })
      .catch(error => {
        console.error('Error deleting product:', error.message);
      });
  };

  return (
    <div className="admin-container">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <div key={product._id} onClick={() => handleProductClick(product._id)} className="product-wrapper">
            <ProductCard
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image_url={product.image_url}
              
            />
            <button className="delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </ul>

      {selectedProductId && (
        <div>
          <h3>Selected Product Details</h3>
          <form>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              value={updateProductData.name}
              onChange={handleInputChange}
            />
            <p>Price:</p>
            <input
              type="text"
              name="price"
              value={updateProductData.price}
              onChange={handleInputChange}
            />
            {/* Add other form fields for other product properties */}
            <button onClick={handleUpdateProduct}>Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
