import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Cart.css";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [couponNotFound, setCouponNotFound] = useState(false);

  useEffect(() => {
    // Calculate the original total when cart items change
    const total = cartItems.reduce((total, product) => total + product.price, 0);
    setOriginalTotal(total);
  }, [cartItems]);

  const handleApplyCoupon = async (couponCode) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/coupons/${couponCode}`);
      const coupon = response.data;
  
      if (coupon && coupon.amount > 0) {
        setDiscount(coupon.amount);
        setCouponNotFound(false); // Reset coupon not found state
      } else {
        setDiscount(0); // Set discount to zero
        setCouponNotFound(true); // Set coupon not found state to true
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Coupon not found');
        setDiscount(0); // Set discount to zero
        setCouponNotFound(true); // Set coupon not found state to true
      } else {
        console.log('Error applying coupon:', error.message);
      }
    }
  };
  

  const calculateTotalPayable = () => {
    const total = cartItems.reduce((total, product) => total + product.price, 0);
    const payableAfterDiscount = total - discount;

    // If the payable amount is negative, return zero
    return payableAfterDiscount > 0 ? payableAfterDiscount : 0;
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart Items - {cartItems.length}</h1>
      <ul className="product-list">
        {cartItems.map((product) => (
          <li key={product._id} className="product-cards">
            <ProductCard
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image_url={product.image_url}
            />
          </li>
        ))}
      </ul>
      <div>
        <input
          placeholder="Enter a Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={() => handleApplyCoupon(couponCode)}>Apply</button>
        {couponNotFound && <p>Coupon not found</p>} {/* Display error message */}
      </div>
      <h1>Total Payable: ${calculateTotalPayable()}</h1>
      <h1>Original Total: ${originalTotal}</h1>
    </div>
  );
};

export default Cart;
