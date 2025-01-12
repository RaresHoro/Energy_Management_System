import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode'; // Correct import based on your clarification
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(name, password);
      const token = response.data.token; // Extract token from response

      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      // Extract userId and username from decoded token
      const { userId, sub: username } = decodedToken;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);

      // Navigate to the appropriate page based on the username
      if (username === 'admin') {
        navigate('/admin'); // Navigate to admin page
      } else {
        navigate('/client', { state: { userId } }); // Navigate to client page
      }
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
              {error && <p className="text-danger mt-3 text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
