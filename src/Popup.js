import React, { useState } from 'react';

const Popup = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if username and password match
    if (username === 'yeswanth' && password === 'cNgYF6ekdGKfhDp') {
      onLoginSuccess(); // Call parent function to indicate successful login
    } else {
      setError('Invalid credentials. Please try again.'); // Show error message
    }
  };

  return (
    <div className="popup-overlay show">
      <div className="popup">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </p>
        <p>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </p>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Popup;

