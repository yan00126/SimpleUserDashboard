import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

function Login({ login }) {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { name, password });
      const user = response.data.user;
      login(user.name, user.role);
      console.log(user.role);
      
      if (user.role === 'admin') {
        console.log('admin1111');
        router.push('/admin-dashboard');
        // <Link href={'/admin-dashboard'}></Link>
      } else {
        console.log('user1111');
        // <Link href={'/user-dashboard'}></Link>
        router.push('/user-dashboard');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/login-background.jpg")', backgroundSize: 'cover' }}>
      <div className="card p-5 shadow-lg" style={{ width: '350px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="font-weight-bold">Username</label>
            <input
              type="text"
              id="username"
              className="form-control mb-3"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="font-weight-bold">Password</label>
            <input
              type="password"
              id="password"
              className="form-control mb-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
