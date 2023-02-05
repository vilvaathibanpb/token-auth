import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username: name })
      };
      const response = await fetch('http://localhost:4000/signup', options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      localStorage.setItem("token", json.token);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="signup-label">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="signup-input" />
        <label htmlFor="name" className="signup-label">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="signup-input" />
        <label htmlFor="password" className="signup-label">Password:</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="signup-input" />
        {error && <p className="signup-error">{error}</p>}
        <button type="submit" className="signup-button">Signup</button>
        <h4 className='link' onClick={() => navigate("/login")}>Log in</h4>
      </form>
    </div>
  );
};

export default Signup;
