import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard';
import './Cart.css'

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
  return (
    <div>
        <h1 className='cart-container'>Cart Items - {cartItems.length}</h1>
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
        
    </div>
  )
}

export default Cart