import React from 'react';

function UserDashboard({ username, logout }) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your user dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
