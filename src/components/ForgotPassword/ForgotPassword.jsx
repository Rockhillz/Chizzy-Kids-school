import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Role state
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setMessage('Please select a role (Teacher or Student).');
      return;
    }

    try {

      const normalizedEmail = email.trim().toLowerCase();
      console.log('normalized email: ', normalizedEmail);


      // Set the API endpoint based on the selected role
      const apiUrl =
        role === 'teacher'
          ? `https://chizzykids-server.onrender.com/api/teacher/request-reset`
          : `https://chizzykids-server.onrender.com/api/request-reset`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Token sent! Check your email.');
        navigate('/reset-password'); // Navigate to Reset Password page
      } else {
        setMessage(data.message || 'Failed to send token');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="d-flex align-items-center justify-content-center min-vh-90 py-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Reset as a Teacher"
                name="role"
                value="teacher"
                checked={role === 'teacher'}
                onChange={handleRoleChange}
              />
              <Form.Check
                type="radio"
                label="Reset as a Student"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={handleRoleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Send Reset Token
            </Button>
          </Form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
