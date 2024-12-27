import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./StudentDetails.css"; // Assuming you have a separate CSS file for styling
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const location = useLocation();
  const studentData = location.state;
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/students")
  }

  return (
    <Container className="mt-5 py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={12} className="text-center mb-4">
          <button className="btn btn-primary" onClick={goBack}>Back to Students List</button>
        </Col>
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header as="h5">Student Details</Card.Header>
            <Card.Body className="student-details-body">
              <Row>
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src={URL.createObjectURL(studentData.image)}
                    alt="Student"
                    fluid
                    style={{ borderRadius: "5px", maxHeight: "300px" }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <p><strong>Full Name:</strong> {studentData.fullname}</p>
                  <p><strong>Address:</strong> {studentData.address}</p>
                  <p><strong>Parent's Name:</strong> {studentData.parents_name}</p>
                  <p><strong>Parent's Phone Number:</strong> {studentData.parent_no}</p>
                  <p><strong>Gender:</strong> {studentData.gender}</p>
                  <p><strong>Date of Birth:</strong> {studentData.dateOfBirth}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetails;
