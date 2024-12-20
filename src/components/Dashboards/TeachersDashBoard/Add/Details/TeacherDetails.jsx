import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./TeacherDetails.css"; // Assuming you have a separate CSS file for styling
import { useNavigate } from "react-router-dom";

const TeacherDetails = () => {
  const location = useLocation();
  const teacherData = location.state; // Data passed from the previous route
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/teachers"); // Navigate back to the teacher's list
  };

  return (
    <Container className="mt-5 py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={12} className="text-center mb-4">
          <button className="btn btn-primary" onClick={goBack}>
            Back to Teachers List
          </button>
        </Col>
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header as="h5">Teacher Details</Card.Header>
            <Card.Body className="teacher-details-body">
              <Row>
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src={URL.createObjectURL(teacherData.image)} // Ensure `teacherData.image` holds the correct image URL
                    alt="Teacher"
                    fluid
                    style={{ borderRadius: "5px", maxHeight: "300px" }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <p><strong>Full Name:</strong> {teacherData.fullname}</p>
                  <p><strong>Email:</strong> {teacherData.email}</p>
                  <p><strong>Phone:</strong> {teacherData.phone}</p>
                  <p><strong>Gender:</strong> {teacherData.gender}</p>
                  <p><strong>Date of Birth:</strong> {teacherData.dateOfBirth}</p>
                  <p><strong>Employee ID:</strong> {teacherData.employeeID}</p>
                  <p><strong>Role:</strong> {teacherData.role}</p>
                  <p><strong>Department:</strong> {teacherData.department}</p>
                  <p><strong>Previous School:</strong> {teacherData.previous_school}</p>
                  <p><strong>Year Enrolled:</strong> {teacherData.yearEnrolled}</p>
                  <p><strong>Qualifications:</strong></p>
                  <ul>
                    {teacherData.qualification.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDetails;
