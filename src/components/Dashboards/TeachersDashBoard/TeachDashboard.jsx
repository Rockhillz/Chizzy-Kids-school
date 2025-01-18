// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Sidebar from "./Sidebar/Sidebar";
// import Profile from "./Profile/Profile";
// import { jwtDecode } from "jwt-decode";
// import TeacherHeader from "./TeachHeader/TeachHeader";
// import Teachers from "./Teachers/Teachers";
// import Students from "./Students/Students";
// import Classrooms from "./classroom/Classrooms";
// import Subjects from "./Subject/Subjects";
// import TeachClassroom from "./Not Admin/TeachClassroom/TeachClassroom";
// // import TeachSubjectList from "./Not Admin/TeachSubjects/TeachSubjectsList";
// import TeachSubject from "./Not Admin/TeachSubjects/TeachSubject";

// const TeachDashboard = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [teacherData, setTeacherData] = useState(null);
//   const [ role, setRoles] = useState("");
// //   const [profile, setProfile] = useState(null);


//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           alert("Token not found. Please try again");
//           return;
//         }

//         const decodedToken = jwtDecode(token);
//         const teacherId = decodedToken.teacherId;

//         const userRole = localStorage.getItem("userRole");
//         setRoles(userRole);


//         const response = await fetch(`https://chizzykids-server.onrender.com/api/singleTeacher/${teacherId}`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setTeacherData(data.teacher);
//         } else {
//           console.error(data.message || "Failed to fetch profile.");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/school";
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <Profile profile={teacherData} />;
//         case "Classroom":
//           return <TeachClassroom />;
//         case "Subject":
//           return <TeachSubject />;
//       case "Students":
//         return <Students />;
//      case "Teachers":
//         return <Teachers />;
//      case "Classrooms":
//        return <Classrooms />;
//      case "Subjects":
//        return <Subjects />;
//      // case "attendance":
//      //   return <Attendance />;
//      // case "resources":
//      //   return <Resources />;
//      // case "messages":
//      //   return <Messages />;
//      // case "settings":
//      //   return <Settings />;
//      // case "help":
//      //   return <Help />;
//      case "Logout":
//         handleLogout();
//        return null;
//       default:
//         return <p>Feature coming soon!</p>;
//     }
//   };

//   return (
//     <div>
//       <TeacherHeader teacherName={teacherData?.fullname} />
//       <Container fluid>
//         <Row>
//           <Col md={2} className="p-0">
//             <Sidebar activeTab={activeTab} role={role} setActiveTab={setActiveTab} />
//           </Col>
//           <Col md={10}>
//             {renderTabContent()}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default TeachDashboard;

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Profile from "./Profile/Profile";
import { jwtDecode } from "jwt-decode";
import TeacherHeader from "./TeachHeader/TeachHeader";
import Teachers from "./Teachers/Teachers";
import Students from "./Students/Students";
import Classrooms from "./classroom/Classrooms";
import Subjects from "./Subject/Subjects";
import TeachClassroom from "./Not Admin/TeachClassroom/TeachClassroom";
import TeachSubject from "./Not Admin/TeachSubjects/TeachSubject";

const TeachDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [teacherData, setTeacherData] = useState(null);
  const [role, setRoles] = useState("");

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

        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/singleTeacher/${teacherId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
      case "Classroom":
        return <TeachClassroom />;
      case "Subject":
        return <TeachSubject />;
      case "Students":
        return <Students />;
      case "Teachers":
        return <Teachers />;
      case "Classrooms":
        return <Classrooms />;
      case "Subjects":
        return <Subjects />;
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
      <Container fluid className="p-2">
        <Row className="d-flex flex-row flex-sm-row flex-wrap">
          <Col xs={12} sm={4} md={2} className="p-0">
            <Sidebar
              activeTab={activeTab}
              role={role}
              setActiveTab={setActiveTab}
            />
          </Col>
          <Col xs={12} sm={8} md={10}>
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeachDashboard;

