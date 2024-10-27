import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = () => {
    // Mock login for admin and regular user
    if (username === 'admin' && password === 'admin123') {
      router.push('/admin-dashboard');
    } else if (username && password) {
      router.push('/user-dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
