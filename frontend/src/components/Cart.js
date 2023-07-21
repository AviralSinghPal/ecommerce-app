import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard';
import './Cart.css'

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const calculateTotalPayable = () => {
      return cartItems.reduce((total, product) => total + product.price, 0);
    };
  
  return (
    <div className='cart-container'>
        <h1 className='cart-heading'>Cart Items - {cartItems.length}</h1>
        <ul className="product-list" >
        {cartItems.map((product) => (
          <li key={product._id} className="product-cards">
            <ProductCard
              id ={product._id}
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
  )
}

export default Cart