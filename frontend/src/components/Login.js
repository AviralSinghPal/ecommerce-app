import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
          password,
        }
      );

      console.log(response);

      if (response.status === 200 && response.data && response.data.user) {
        setIsLoggedin(response.data.user);
        navigate("/");
      } else {
        console.error(
          "Login failed:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/createuser",
        {
          username: registerUsername,
          email,
          password: registerPassword,
        }
      );

      console.log(response);

      if (response.status === 201 && response.data && response.data.user) {
        const loginResponse = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            username: registerUsername,
            password: registerPassword,
          }
        );
        if (
          loginResponse.status === 200 &&
          loginResponse.data &&
          loginResponse.data.user
        ) {
          setIsLoggedin(loginResponse.data.user);
          
          navigate("/");
        } else {
          console.error(
            "Login after signup failed:",
            loginResponse.data.message || "Unknown error"
          );
        }
      } else {
        console.error(
          "Signup failed:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="container-ls">
      <div className="main-login">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Log in
            </label>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log in</button>
          </form>
        </div>

        <div className="register">
          <form className="form" onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Username"
              required
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
