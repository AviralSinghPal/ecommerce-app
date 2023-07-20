import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <h2>User List:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
