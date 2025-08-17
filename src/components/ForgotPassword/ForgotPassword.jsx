import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!role) {
      setError("Please select a role (Teacher or Student).");
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();
      const apiUrl =
        role === "teacher"
          ? `${import.meta.env.VITE_API_BASE_URL}/teacher/request-reset`
          : `${import.meta.env.VITE_API_BASE_URL}/request-reset`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("A reset token has been sent to your email.");
        setShowSuccessModal(true);
        localStorage.setItem("email", normalizedEmail);
        setTimeout(() => {
          navigate("/reset-password");
        }, 3000);
        
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Forgot Password</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <br />
              <ToggleButtonGroup
                type="radio"
                name="role"
                value={role}
                onChange={(val) => setRole(val)} // now val will be "teacher" or "student"
              >
                <ToggleButton
                  id="role-teacher"
                  value="teacher"
                  variant="outline-primary"
                >
                  Teacher
                </ToggleButton>
                <ToggleButton
                  id="role-student"
                  value="student"
                  variant="outline-primary"
                >
                  Student
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : "Send Reset Token"}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password reset instructions have been sent to your email.
        </Modal.Body>
      </Modal>
    </Container>
  );
}
