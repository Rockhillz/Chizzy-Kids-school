import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset successful!');
        navigate('/school'); // Navigate to Login page
      } else {
        setMessage(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100 py-5'>
      <div className='reset-password-container'>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type="text"
            placeholder="Enter your token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='form-control mb-3'
          />
          <button type="submit" className='btn btn-primary w-100'>Reset Password</button>
        </form>
        {message && <p className='mt-3'>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
