import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const SubjectsList = ({ setSelectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/subjects`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setSubjects(data.subjects || data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="table-responsive">
      <div className="mb-3 d-flex justify-content-between">
        <h3>Subjects List</h3>
        <Button variant="primary">Add Subject</Button>
      </div>
      <Table bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Subject Name</th>
            <th>Teacher</th>
            <th>Students Count</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject._id}
              onClick={() => setSelectedSubject(subject._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{subject.name}</td>
              <td>{subject.teacher ? subject.teacher.fullname : "N/A"}</td>
              <td>{subject.students ? subject.students.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubjectsList;
