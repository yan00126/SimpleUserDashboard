// client/src/App.js
import React from 'react';
import UserList from "@/pages/components/UserList";
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on initial load
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const admin = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const login = (inputUsername, password) => {
    if (inputUsername === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUsername(inputUsername);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('username', inputUsername);
      router.push('/admin-dashboard');
    } else if (inputUsername && password) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setUsername(inputUsername);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('username', inputUsername);
      router.push('/user-dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    router.push('/');
  };

  return (
    <Component 
      {...pageProps} 
      isLoggedIn={isLoggedIn} 
      isAdmin={isAdmin} 
      username={username}
      login={login} 
      logout={logout} 
    />
  );
}

export default MyApp;
