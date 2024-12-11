import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation after login
import "./schoolportal.css";

const SchoolPortal = () => {
  const [role, setRole] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!role) {
      alert("Please select a role(Teacher or Student).");
      return;
    }

    if (!credentials.email || !credentials.password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Normalize email before sending to the server
      const normalizedEmail = credentials.email.trim().toLowerCase();

      const apiUrl =
        role === "teacher"
          ? "https://chizzykids-server.onrender.com/api/loginTeacher"
          : "https://chizzykids-server.onrender.com/api/student/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      console.log("noo",data);

      if (response.ok) {
        // save token or user info to localStorage if needed
        // localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        //Redirect to the appropriate dashboard
        if (role === "teacher") {
          // get user role
          localStorage.setItem("userRole", data.teacher.role);
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        alert(data.message || "Login failed. Please try aagin.");
      }
    } catch (error) {
      console.error("Login error:", error.message, error.response || error);
      alert("An error occured during login. Please try again later.");
    } finally {
      setLoading(false);
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
            <div
              className="p-4 mb-5 mt-5 border rounded shadow mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <h3 className="text-center mb-4">Sign In</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      name="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      variant="light"
                      className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
                      style={{
                        border: "none",
                        background: "none",
                        backgroundColor: "none",
                        boxShadow: "none", // Removes any box shadow
                        color: "inherit", // Keeps the icon color
                        outline: "none", // Removes the focus outline
                        zIndex: "2",
                      }}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        setShowPassword((prev) => !prev); // Toggle showPassword state
                      }}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} /> // Icon for hiding the password
                      ) : (
                        <FaEye size={20} /> // Icon for showing the password
                      )}
                    </Button>
                  </div>
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
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 bg-t"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <Spinner
                      animation="grow" // Growing spinner
                      size="sm"
                      className="me-2"
                    />
                  ) : (
                    "Login"
                  )}
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
