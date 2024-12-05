import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa"
import "./styles.css"

const StudentHeader = ({ studentName }) => {
    const styles = {
        footer: {
          backgroundColor: "#0a4275"
        }
      }


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/school";
  };

  return (
    <Navbar variant="dark" className="head">
      <Container>
        <Navbar.Brand>
          <span className="text-dark">Welcome, {studentName || "Student"}!</span>
        </Navbar.Brand>
        <Button style={styles.footer} size="sm" onClick={handleLogout}>
          Logout <FaSignOutAlt />
        </Button>
      </Container>
    </Navbar>
  );
};

export default StudentHeader;
