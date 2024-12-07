import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    fullname: "",
    password: "",
    image: null,
    address: "",
    parents_name: "",
    parent_no: "",
    gender: "",
    dateOfBirth: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setStudentData({ ...studentData, [name]: files[0] });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://your-api-url.com/students", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Student created successfully!");
        setErrorMessage("");

        // Exclude password before navigating
        const { password, ...studentWithoutPassword } = studentData;

        // Navigate to the new component with student data
        navigate("/student-details", { state: studentWithoutPassword });
      } else {
        setErrorMessage(data.message || "An error occurred while creating the student.");
      }
    } catch (error) {
      console.error("Error creating student:", error);
      setErrorMessage("An error occurred while creating the student. Please try again later.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center my-4">Create Student</h2>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullname" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={studentData.fullname}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={studentData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={studentData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>

            <Form.Group controlId="parents_name" className="mb-3">
              <Form.Label>Parent's Name</Form.Label>
              <Form.Control
                type="text"
                name="parents_name"
                value={studentData.parents_name}
                onChange={handleInputChange}
                placeholder="Enter parent's name"
                required
              />
            </Form.Group>

            <Form.Group controlId="parent_no" className="mb-3">
              <Form.Label>Parent's Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="parent_no"
                value={studentData.parent_no}
                onChange={handleInputChange}
                placeholder="Enter parent's phone number"
                required
              />
            </Form.Group>

            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={studentData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="dateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={studentData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudent;
