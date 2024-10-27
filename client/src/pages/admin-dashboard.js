import React from 'react';
import UserList from './components/UserList';

function AdminDashboard({ username, logout }) {
  return (
    <div>
      <h1>Welcome, Admin {username}!</h1>
      <UserList />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
