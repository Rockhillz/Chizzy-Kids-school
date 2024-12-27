import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const SubjectList = ({ studentId }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSubjects = async () => {
      
      try {
          const response = await fetch(`https://chizzykids-server.onrender.com/api/student-subjects/${studentId}`);
          console.log("Fetching subjects from:", response);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched subjects:", data.subjects);
        setSubjects(data.subjects);
      } catch (err) {
        console.error("Error fetching subjects:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Subject List</h1>
      {loading && <div className="alert alert-info">Loading subjects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S/no</th>
              <th>Subject Name</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject._id}>
                <td>{index + 1}</td>
                <td>{subject.name}</td>
                <td>
                  {subject.teacher ? subject.teacher.fullname : "Not Assigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SubjectList;
