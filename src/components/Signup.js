import React, { useState } from 'react';

const Signup = ({ handleSignup, setShowSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(name, email, password);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setShowSignup(false)}>
          X
        </button>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;