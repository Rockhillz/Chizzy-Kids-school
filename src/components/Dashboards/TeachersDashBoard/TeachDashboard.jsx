import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Profile from "./Profile/Profile";

import { jwtDecode } from "jwt-decode";
import TeacherHeader from "./TeachHeader/TeachHeader";
import Teachers from "./Teachers/Teachers";
import Students from "./Students/Students";

const TeachDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [teacherData, setTeacherData] = useState(null);
  const [ role, setRoles] = useState("");
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
        const teacherId = decodedToken.teacherId;

        const userRole = localStorage.getItem("userRole");
        setRoles(userRole);


        const response = await fetch(`https://chizzykids-server.onrender.com/api/singleTeacher/${teacherId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTeacherData(data.teacher);
        } else {
          console.error(data.message || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/school";
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile profile={teacherData} />;
      case "Students":
        return <Students />;
     case "Teachers":
        return <Teachers />;
     // case "classroom":
     //   return <Schedule />;
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
     case "Logout":
        handleLogout();
       return null;
      default:
        return <p>Feature coming soon!</p>;
    }
  };

  return (
    <div>
      <TeacherHeader teacherName={teacherData?.fullname} />
      <Container fluid>
        <Row>
          <Col md={3} className="p-0">
            <Sidebar activeTab={activeTab} role={role} setActiveTab={setActiveTab} />
          </Col>
          <Col md={9}>
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeachDashboard;
