import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Container, Table } from "react-bootstrap";
import "./Students.css";

const StudentsList = ({ setSelectedStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/students`
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

  if (loading) return <p>Loading Students...</p>;

  return (
    <div className="table-responsive">
      <h3 className="text-center mb-4">Students List</h3>
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
              <td>{student.classroom ? student.classroom.name : "N/A"}</td>
              <td>{student.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentsList;
