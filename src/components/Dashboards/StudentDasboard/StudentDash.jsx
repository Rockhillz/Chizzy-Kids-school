import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Nav, Card, Table, Image } from "react-bootstrap";
import "./styles.css";

const StudentDash = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-vh-100 bg-light mt-5">
      {/* Header */}
      <header className="bg-primary text-white py-3">
        <Container>
          <h1>Student Dashboard</h1>
        </Container>
      </header>

      {/* Main Content */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-white shadow-sm p-3">
            <Nav className="flex-column">
              {/* Sidebar Links */}
              <Nav.Link
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "bg-light fw-bold" : ""}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("courses")}
                className={activeTab === "courses" ? "bg-light fw-bold" : ""}
              >
                Courses
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("grades")}
                className={activeTab === "grades" ? "bg-light fw-bold" : ""}
              >
                Grades
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("schedule")}
                className={activeTab === "schedule" ? "bg-light fw-bold" : ""}
              >
                Schedule
              </Nav.Link>
            </Nav>
          </Col>

          {/* Content Area */}
          <Col md={9} className="p-4">
            {/* Conditional Rendering for Active Tab */}
            {activeTab === "profile" && <Profile />}
            {activeTab === "courses" && <Courses />}
            {activeTab === "grades" && <Grades />}
            {activeTab === "schedule" && <Schedule />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Profile Component
const Profile = () => (
  <Card>
    <Card.Body>
      <Card.Title>Profile</Card.Title>
      <Row>
        
        <div className="row mb-3" style={{width:"350px"}}>
          <div className="col-12 col-sm-6 " style={{width:"130px"}}>
            <Image src="https://placehold.co/100x100" className="image" />
          </div>
          <div className="col-12 col-sm-6 pt-4" >
            <h2>John Doe</h2>
          </div>
        </div>

        

        <Col sm={12}>
          <p>Student ID: 123456</p>
          <p>Email: john.doe@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

// Courses Component
const Courses = () => (
  <Card>
    <Card.Body>
      <Card.Title>Courses</Card.Title>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy Data for Courses */}
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>CSE{index + 101}</td>
              <td>Course {index + 1}</td>
              <td>Instructor {index + 1}</td>
              <td>{Math.floor(Math.random() * 4) + 1}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

// Grades Component
const Grades = () => (
  <Card>
    <Card.Body>
      <Card.Title>Grades</Card.Title>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy Data for Grades */}
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>CSE{index + 101}</td>
              <td>Course {index + 1}</td>
              <td>
                {["A", "B", "C", "D", "F"][Math.floor(Math.random() * 5)]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

// Schedule Component
const Schedule = () => (
  <Card>
    <Card.Body>
      <Card.Title>Schedule</Card.Title>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Course</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy Data for Schedule */}
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td>{`${8 + index}:00 AM - ${9 + index}:00 AM`}</td>
                <td>Course {index + 1}</td>
                <td>Room {Math.floor(Math.random() * 100) + 1}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default StudentDash;
