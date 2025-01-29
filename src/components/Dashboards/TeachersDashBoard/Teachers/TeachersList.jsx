// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Badge, Container, Table, Button, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./Teacher.css";

// const TeachersList = ({ setSelectedTeacher }) => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getAllTeachers`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include token in Authorization header
//           },
//         });

//         const data = await response.json();
//         setTeachers(data.teachers || data);
//       } catch (err) {
//         console.error("Error fetching teachers:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const addTeacher = () => {
//     navigate("/add-teacher");
//   }

//   if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;

//   return (
//     <div className="table-responsive">
//         <div style={{ width: "900px"}} className="mb-3">
//         <div className="d-flex justify-content-between">
//           <h3 className="">Teachers List</h3>
//           <Button
//           className="bg-t"
//           onClick={() => addTeacher()}
//           >Add Teacher</Button>
//         </div>
//       </div>

//       <Table bordered hover className="align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th>Teacher ID</th>
//             <th>Full Name</th>
//             <th>Classroom</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher, index) => (
//             <tr
//               key={index}
//               className="h-100 shadow-sm"
//               onClick={() => setSelectedTeacher(teacher._id)}
//               style={{ cursor: "pointer" }}
//             >
//               <td>{teacher.employeeID}</td>
//               <td>{teacher.fullname}</td>
//               <td>{teacher.classroom ? teacher.classroom.className : "N/A"}</td>
//               <td>{teacher.gender}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default TeachersList;

import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Teacher.css"; // Ensure you have this CSS file for custom styles

const TeachersList = ({ setSelectedTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/getAllTeachers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        const data = await response.json();
        setTeachers(data.teachers || data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const addTeacher = () => {
    navigate("/add-teacher");
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
        <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h3 className="mb-0">Teachers List</h3>
            <Button
              className="bg-t"
              onClick={addTeacher}
            >
              Add Teacher
            </Button>
          </div>

          {/* Responsive Table */}
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Teacher ID</th>
                  <th>Full Name</th>
                  <th>Classroom</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr
                    key={index}
                    className="h-100 shadow-sm"
                    onClick={() => setSelectedTeacher(teacher._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{teacher.employeeID}</td>
                    <td>{teacher.fullname}</td>
                    <td>{teacher.classroom ? teacher.classroom.className : "N/A"}</td>
                    <td>{teacher.gender}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TeachersList;
