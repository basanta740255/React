import React, { useState } from 'react';

const users = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' },
  user: { username: 'user', password: 'user123', role: 'user' },
};

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(sessionStorage.getItem('role') || '');

  const login = () => {
    if (users.admin.username === username && users.admin.password === password) {
      sessionStorage.setItem('role', 'admin');
      setRole('admin');
    } else if (users.user.username === username && users.user.password === password) {
      sessionStorage.setItem('role', 'user');
      setRole('user');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setRole('');
    sessionStorage.removeItem('role');
  };

  const displayPages = () => {
    if (role === 'admin') {
      return (
        <div>
          <h2>Admin Page</h2>
          <p>Welcome to admin page</p>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else if (role === 'user') {
      return (
        <div>
          <h2>User Page</h2>
          <p>Welcome to user page</p>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Welcome to Shop</h1>
      {displayPages()}
    </div>
  );
}

export default Auth;
