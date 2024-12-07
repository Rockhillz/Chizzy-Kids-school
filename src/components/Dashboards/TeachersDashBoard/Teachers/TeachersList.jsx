import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Container, Table } from "react-bootstrap";
import "./Teacher.css";

const TeachersList = ({ setSelectedTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/getAllTeachers`
        );
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

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="table-responsive">
      <h3 className="text-center mb-4">Teachers List</h3>
      <Table bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Teacher ID</th>
            <th>Full Name</th>
            <th>Classroom</th>
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
              <td>{teacher.classroom ? teacher.classroom.name : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeachersList;
