import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";


const AddStudent = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [studentData, setStudentData] = useState({
    fullname: "",
    password: "",
    image: null,
    email: "",
    address: "",
    parents_name: "",
    parent_no: "",
    gender: "",
    dateOfBirth: "",
  });

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

    if (studentData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        `https://chizzykids-server.onrender.com/api/register/student`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Student created successfully!");
        setErrorMessage("");
        setShowModal(true);

        // // Exclude password before navigating
        // const { password, ...studentWithoutPassword } = studentData;

        // // Navigate to the new component with student data
        // navigate("/student-details", { state: studentWithoutPassword });
      } else {
        setErrorMessage(
          data.message || "An error occurred while creating the student."
        );
      }
    } catch (error) {
      console.error("Error creating student:", error);
      setErrorMessage(
        "An error occurred while creating the student. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("");
    setStudentData({
      fullname: "",
      password: "",
      image: null,
      email: "",
      address: "",
      parents_name: "",
      parent_no: "",
      gender: "",
      dateOfBirth: "",
    });
    setConfirmPassword("");
  };

  const goBack = () => {
    navigate("/teacher-dashboard");
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex mt-5 mb-3 justify-content-between">
            <h2 className="">Add Student</h2>
            <Button
              variant="outline-primary"
              onClick={goBack}
              className="tex-end"
              style={{ height: "" }}
            >
              Back
            </Button>
          </div>

          {/* {successMessage && <Alert variant="success">{successMessage}</Alert>} */}
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

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={studentData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  name="password"
                  value={studentData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
                <Button
                  variant="light"
                  className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
                  style={{
                    border: "none",
                    background: "none",
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

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
                <Button
                  variant="light"
                  className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
                  style={{
                    border: "none",
                    background: "none",
                    boxShadow: "none", // Removes any box shadow
                    color: "inherit", // Keeps the icon color
                    outline: "none", // Removes the focus outline
                    zIndex: "2",
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    setShowConfirmPassword((prev) => !prev); // Toggle show/hide password
                  }}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} /> // Icon for hiding the confirm password
                  ) : (
                    <FaEye size={20} /> // Icon for showing the confirm password
                  )}
                </Button>
              </div>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                "Submit"
              )}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Modal for Success Message */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <FaCheckCircle
            size={50}
            className="text-success mb-3"
          />
          <h4> {successMessage} </h4>
          <Button
            variant="success"
            onClick={handleCloseModal}
            className="mt-3"
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AddStudent;
