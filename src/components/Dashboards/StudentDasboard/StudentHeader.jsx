import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa"
import "./styles.css"

const StudentHeader = ({ studentName }) => {

  return (
    <Navbar variant="dark" className="head">
      <Container>
        <Navbar.Brand>
          <span className="text-dark">Welcome, {studentName || "Student"}!</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default StudentHeader;
