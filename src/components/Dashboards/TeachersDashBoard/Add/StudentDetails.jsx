import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const StudentDetails = () => {
  const location = useLocation();
  const studentData = location.state;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header as="h5">Student Details</Card.Header>
            <Card.Body>
              <p>
                <strong>Full Name:</strong> {studentData.fullname}
              </p>
              <p>
                <strong>Address:</strong> {studentData.address}
              </p>
              <p>
                <strong>Parent's Name:</strong> {studentData.parents_name}
              </p>
              <p>
                <strong>Parent's Phone Number:</strong> {studentData.parent_no}
              </p>
              <p>
                <strong>Gender:</strong> {studentData.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {studentData.dateOfBirth}
              </p>
              <img
                src={URL.createObjectURL(studentData.image)}
                alt="Student"
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetails;
