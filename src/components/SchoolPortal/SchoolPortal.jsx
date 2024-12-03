import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation after login
import "./schoolportal.css";

const SchoolPortal = () => {
  const [role, setRole] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({...credentials, [name]: value})
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if(!role) {
      alert("Please select a role(Teacher or Student).");
      return;
    }

    if (!credentials.username || !credentials.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const apiUrl = 
      role === "teacher"
      ? "https://chizzykids-server.onrender.com/api/getAllTeachers"
      : "https://api.example.com/studentlogin";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if(response.ok) {
        // save token or user info to localStorage if needed
        localStorage.setItem("userData", JSON.stringify(data));

        //Redirect to the appropriate dashboard
        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
        
      } else {
        alert (data.message || "Login failed. Please try aagin.");
      }
    } catch (error) {
      console.error("Login error:", error.message, error.response || error);
      alert("An error occured during login. Please try again later.");
    }
  };

  return (
    <section className="container-fluid" id="mainBox">
      <Container>
        <Row className="align-items-center justify-content-center mt-5 display">
          {/* Welcome Message */}
          <Col xs={12} md={6} className="text-center text-md-start mb-4">
            <div className="ms-md-4">
              <h2>Welcome to the School Portal</h2>
              <p>Please login to access your account.</p>
            </div>
          </Col>

          {/* Login Form */}
          <Col xs={12} md={6}>
            <div className="p-4 mb-5 mt-5 border rounded shadow mx-auto" style={{ maxWidth: "400px" }}>
              <h3 className="text-center mb-4">Sign In</h3>
              <Form>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Login as a Teacher"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={handleRoleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Login as a Student"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={handleRoleChange}
                  />
                </Form.Group>

                <Form.Group className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a
                    href="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </a>
                </Form.Group>

               <Button variant="primary" type="submit" className="w-100" >
                Login
                  
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SchoolPortal;
