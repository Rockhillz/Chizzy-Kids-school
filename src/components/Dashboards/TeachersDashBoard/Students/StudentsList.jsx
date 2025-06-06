
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Container,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Students.css";

const StudentsList = ({ setSelectedStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/students`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        const data = await response.json();
        setStudents(data.students || data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = () => {
    navigate("/add-student");
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-3"
      />
    );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
          <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <h3 className="mb-0">Students List</h3>
            <Button className="bg-t" onClick={addStudent}>
              Add Student
            </Button>
          </div>
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Classroom</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="h-100 shadow-sm"
                    onClick={() => setSelectedStudent(student._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{student.studentID}</td>
                    <td>{student.fullname}</td>
                    <td>
                      {student.classroom ? student.classroom.className : "N/A"}
                    </td>
                    <td>{student.gender}</td>
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

export default StudentsList;
