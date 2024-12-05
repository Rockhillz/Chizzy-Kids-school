import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Profile = ({ profile }) => {
  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={4}>
            <img
              src={profile.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="img-fluid rounded-circle"
            />
          </Col>
          <Col md={8}>
            <h4>{profile.fullname}</h4>
            <p>Email: {profile.email}</p>
            <p>Student ID: {profile.studentID}</p>
            <p>Address: {profile.address || "Not available"}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Profile;
