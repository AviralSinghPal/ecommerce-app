import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext'; // Import the AuthContext
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Access the AuthContext to get the setIsLoggedin function
  const { setIsLoggedin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      console.log(response);

      // Check if the login was successful (you may have to adjust this based on the API response)
      if (response.status === 200 && response.data && response.data.user) {
        // Set isLoggedin state to true
        setIsLoggedin(true);

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        console.error('Login failed:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
