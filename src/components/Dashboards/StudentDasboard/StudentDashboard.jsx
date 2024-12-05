import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import StudentSubject from "./StudentSubject";
import StudentHeader from "./StudentHeader";
import { jwtDecode } from "jwt-decode";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [studentData, setStudentData] = useState(null);
//   const [profile, setProfile] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token not found. Please try again");
          return;
        }

        const decodedToken = jwtDecode(token);
        const studentId = decodedToken.studentId;


        const response = await fetch(`https://chizzykids-server.onrender.com/api/single-student/${studentId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setStudentData(data.student);
        } else {
          console.error(data.message || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile profile={studentData} />;
      case "courses":
        return <StudentSubject />;
     // case "schedule":
     //   return <Schedule />;
     // case "grades":
     //   return <Grades />;
     // case "attendance":
     //   return <Attendance />;
     // case "resources":
     //   return <Resources />;
     // case "messages":
     //   return <Messages />;
     // case "settings":
     //   return <Settings />;
     // case "help":
     //   return <Help />;
    //  case "logout":
    //    return <Logout />;
      default:
        return <p>Feature coming soon!</p>;
    }
  };

  return (
    <div>
      <StudentHeader studentName={studentData?.fullname} />
      <Container fluid>
        <Row>
          <Col md={3} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>
          <Col md={9}>
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDashboard;
