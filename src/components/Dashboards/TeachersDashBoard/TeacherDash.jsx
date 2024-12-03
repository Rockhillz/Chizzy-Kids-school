
import './TeacherDashboard.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const TeacherDash = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherData, setTeacherData] = useState(null);

  useEffect (() => {
    //Get data from localStorage
    const userData =JSON.parse(localStorage.getItem("userData"));
    console.log(userData);

    if(userData) {
      setTeacherData(userData);
    } else {
      alert("No user data found. Please log in.");
    }
  }, []);

  if (!teacherData){
    return <p>Loading...</p>;
  }

  const Profile = () => (
    <div>
      <h2 className="mb-4">Profile</h2>
      <div className="bg-light p-4 border rounded">
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://placehold.co/100x100"
            alt="Profile of the teacher"
            className="rounded-circle me-4"
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            <h3 className="mb-1">{teacherData.name}</h3>
            <p className="text-muted">Teacher ID: 789012</p>
          </div>
        </div>
        <p><strong>Email:</strong> jane.smith@example.com</p>
        <p><strong>Phone:</strong> (987) 654-3210</p>
        <p><strong>Address:</strong> 456 Elm St, Anytown, USA</p>
      </div>
    </div>
  );

  const Classes = () => (
    <div>
      <h2 className="mb-4">Classes</h2>
      <div className="bg-light p-4 border rounded">
        <table className="table">
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>CLS{index + 201}</td>
                <td>Class {index + 1}</td>
                <td>{Math.floor(Math.random() * 30) + 20}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Students = () => (
    <div>
      <h2 className="mb-4">Students</h2>
      <div className="bg-light p-4 border rounded">
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Student {index + 1}</td>
                <td>Class {Math.floor(Math.random() * 10) + 1}</td>
                <td>{Math.floor(Math.random() * 10) + 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Schedule = () => (
    <div>
      <h2 className="mb-4">Schedule</h2>
      <div className="bg-light p-4 border rounded">
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Class</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td>{`${8 + index}:00 AM - ${9 + index}:00 AM`}</td>
                <td>Class {index + 1}</td>
                <td>Room {Math.floor(Math.random() * 100) + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Attendance = () => (
    <div>
      <h2 className="mb-4">Attendance</h2>
      <div className="bg-light p-4 border rounded">
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Student {index + 1}</td>
                <td>Class 1</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>
                  <select className="form-select">
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="mb-4 TDash">
        <Container>
          <Navbar.Brand>Teacher Dashboard</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-light border-end" style={{ minHeight: '100vh' }}>
            <Nav className="flex-column p-3">
              <Nav.Link
                className={`p-2 ${activeTab === 'profile' ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                className={`p-2 ${activeTab === 'classes' ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('classes')}
              >
                Classes
              </Nav.Link>
              <Nav.Link
                className={`p-2 ${activeTab === 'students' ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                Students
              </Nav.Link>
              <Nav.Link
                className={`p-2 ${activeTab === 'schedule' ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </Nav.Link>
              <Nav.Link
                className={`p-2 ${activeTab === 'attendance' ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('attendance')}
              >
                Attendance
              </Nav.Link>
            </Nav>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-4">
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'classes' && <Classes />}
            {activeTab === 'students' && <Students />}
            {activeTab === 'schedule' && <Schedule />}
            {activeTab === 'attendance' && <Attendance />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeacherDash;
