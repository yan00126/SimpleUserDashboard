import React from 'react';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard({ username, logout }) {
  return (
    <div className="container mt-5">
      {/* Admin Welcome Section */}
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="display-4 text-primary">Welcome, Admin {username}!</h1>
          <button className="btn btn-danger mt-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* User List Section */}
      <div className="row">
        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
