import React,{useEffect,useContext} from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "./Cart.css";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

const Cart = () => {
  
  const cartItems = useSelector((store) => store.cart.items);
  const calculateTotalPayable = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };
  const { isLoggedin } = useContext(AuthContext);
  useEffect(() => {
    const updateCartItems = async () => {
      const productIds = cartItems.map((product) => product.id);
      // try {
      //   const res = await axios.put(`http://localhost:5000/api/users/${isLoggedin._id}`, {
      //     cartItems: productIds,
      //   });
      //   console.log("Cart items updated:", res.data);
      // } catch (error) {
      //   console.error("Failed to update cart items:", error.message);
      // }
    };

    updateCartItems();
  }, [cartItems, isLoggedin._id]);

   
  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart Items - {cartItems.length}</h1>
      <ul className="product-list">
        {cartItems.map((product) => (
          <li key={product._id} className="product-cards">
            <ProductCard key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image_url={product.image_url}
            />
          </li>
        ))}
      </ul>
      <h1>Total Payable: ${calculateTotalPayable()}</h1>
    </div>
  );
};

export default Cart;
