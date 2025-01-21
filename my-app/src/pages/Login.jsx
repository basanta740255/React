import React, { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [storedEmail, setStoredEmail] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if it's Register or Login

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters including a special character');
      return;
    }

    // Check if email exists and password matches
    if (email === storedEmail && password === storedPassword) {
      setError('');
      setAuthenticated(true);
      alert('Login successful');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters including a special character');
      return;
    }

    setStoredEmail(email);
    setStoredPassword(password);
    setError('');
    setIsRegistering(false); // Switch back to login after successful registration

    alert('Registered successfully');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>{isAuthenticated ? 'Welcome Back' : isRegistering ? 'Register Page' : 'Login Page'}</h1>

      {/* Conditional Form Rendering */}
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            type="submit"
            style={{ width: '100%', padding: '10px', color: 'white', backgroundColor: 'blue' }}
          >
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            type="submit"
            style={{ width: '100%', padding: '10px', color: 'white', backgroundColor: 'blue' }}
          >
            Login
          </button>
        </form>
      )}

      {/* Switch between Login and Register */}
      {!isAuthenticated && (
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            color: 'white',
            backgroundColor: 'green',
          }}
        >
          {isRegistering ? 'Login' : ' Register'}
        </button>
      )}

      {isAuthenticated && storedEmail && storedPassword && (
        <div style={{ marginTop: '20px' }}>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{storedEmail}</td>
                <td>{'****'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
