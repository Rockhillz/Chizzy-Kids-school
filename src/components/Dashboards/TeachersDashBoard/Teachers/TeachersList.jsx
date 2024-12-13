import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";

const TeachersList = ({ setSelectedTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://chizzykids-server.onrender.com/api/getAllTeachers`, {
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
  }

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="table-responsive">
        <div style={{ width: "900px"}} className="mb-3">
        <div className="d-flex justify-content-between">
          <h3 className="">Teachers List</h3>
          <Button
          className="bg-t"
          onClick={() => addTeacher()}
          >Add Teacher</Button>
        </div>
      </div>

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
              <td>{teacher.classroom ? teacher.classroom.name : "N/A"}</td>
              <td>{teacher.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeachersList;
