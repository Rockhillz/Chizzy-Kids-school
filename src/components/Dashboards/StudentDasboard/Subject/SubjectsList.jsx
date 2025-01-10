import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";

const SubjectList = ({ studentId }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/student-subjects/${studentId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

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
    <div className="container">
      <h2 className="text-center mb-3">Subjects</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subjects</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject._id}>
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
