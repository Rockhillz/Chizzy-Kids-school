import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa"
import "../../StudentDasboard/styles.css"


const TeacherHeader = ({ teacherName }) => {

  return (
    <Navbar variant="dark" className="head">
      <Container>
        <Navbar.Brand>
          <span className="text-dark">Welcome, { teacherName || "Teacher"}!</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TeacherHeader;