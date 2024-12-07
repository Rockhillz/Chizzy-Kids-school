import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation

const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    fullname: "",
    password: "",
    image: null,
    department: "",
    address: "",
    phone: "",
    gender: "",
    qualification: "",
    previous_school: "",
    dateOfBirth: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setTeacherData({ ...teacherData, [name]: files[0] });
    } else {
      setTeacherData({ ...teacherData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(teacherData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://your-api-url.com/teachers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Teacher created successfully!");
        setErrorMessage("");

        // Exclude password before navigating
        const { password, ...teacherWithoutPassword } = teacherData;

        // Navigate to the new component with teacher data
        navigate("/teacher-details", { state: teacherWithoutPassword });
      } else {
        setErrorMessage(data.message || "An error occurred while creating the teacher.");
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
      setErrorMessage("An error occurred while creating the teacher. Please try again later.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center my-4">Create Teacher</h2>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullname" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={teacherData.fullname}
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
                value={teacherData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="department" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={teacherData.department}
                onChange={handleInputChange}
                placeholder="Enter department"
                required
              />
            </Form.Group>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={teacherData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={teacherData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={teacherData.gender}
                onChange={handleInputChange}
                placeholder="Enter gender"
                required
              />
            </Form.Group>
            <Form.Group controlId="qualification" className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={teacherData.qualification}
                onChange={handleInputChange}
                placeholder="Enter qualification"
                required
              />
            </Form.Group>
            <Form.Group controlId="previous_school" className="mb-3">
              <Form.Label>Previous School</Form.Label>
              <Form.Control
                type="text"
                name="previous_school"
                value={teacherData.previous_school}
                onChange={handleInputChange}
                placeholder="Enter previous school"
                required
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={teacherData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: "#0a4275"}}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTeacher;
