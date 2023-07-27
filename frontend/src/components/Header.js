import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import "./Header.css";
import logoimg from "../img/logo.png";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const { isLoggedin, setIsLoggedin } = useContext(AuthContext);
  const cartItems = useSelector((store) => store.cart.items);

  const handleLogout = async () => {
    try {
      // Make a backend API call to logout the user
      const res = await axios.post("http://localhost:5000/api/users/logout");
      // Handle the response from the backend if needed
      setIsLoggedin("");
      console.log(res.data.message);
      console.log("User logged out successfully!");
      // Navigate to the login page after successful logout
    } catch (error) {
      // Handle errors if needed
      console.error("Failed to logout:", error.message);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={logoimg} alt="Glamazon Logo" />
          <h1 className="logo-name">Glamazon</h1>
        </div>
        <div>Hi ! {isLoggedin.username}</div>
        {isLoggedin !== "" ? (
          <nav className="nav">
            <ul className="ul">
              <li className="li">
                <Link to="/">Home</Link>
              </li>
              <li className="li">
                <Link to="/products">Products</Link>
              </li>
              {isLoggedin.role === "admin" && ( // Conditionally render the Admin Portal link
                <li className="li">
                  <Link to="/admin">Admin Portal</Link>
                </li>
              )}
              <li className="li">
                <Link to="/cart">Cart-{cartItems.length} items</Link>
              </li>
              <li className="li">
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>{" "}
                {/* Add a logout link */}
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
