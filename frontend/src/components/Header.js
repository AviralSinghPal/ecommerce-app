import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import './Header.css'; 
const Header = () => {
  const { isLoggedin } = useContext(AuthContext); 

  return (
    <header className="header"> 
      <div className="container">
        <h1 className="logo">Glamazon</h1>
        {isLoggedin ? (
          <nav className="nav"> 
            <ul className="ul"> 
              <li className="li"> 
                <Link to="/">Home</Link>
              </li>
              <li className="li"> 
                <Link to="/products">Products</Link>
              </li>
              <li className="li"> 
                <Link to="/cart">Cart</Link>
              </li>
              <li className="li"> 
                <Link to="/logout">Logout</Link> {/* Add a logout link */}
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="nav"> 
            <ul className="ul"> 
              <li className="li"> 
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
