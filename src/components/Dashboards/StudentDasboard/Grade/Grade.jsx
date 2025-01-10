import React, { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const getStudentIdFromToken = () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return null;
          const decodedToken = JSON.parse(atob(token.split(".")[1])); 
          return decodedToken.studentId || null;
        } catch (error) {
          console.error("Error decoding token:", error);
          return null;
        }
      };

      const studentId = getStudentIdFromToken();


      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch(
          `http://localhost:8080/api/student/grades/${studentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }

        const data = await response.json();
        setGrades(data);
      } catch (err) {
        setError(err.message || "Error fetching grades");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <Container className="">
      <h2 className="text-center mb-3">Subject Grades</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Subject</th>
              <th>First Assessment</th>
              <th>Second Assessment</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade._id}>
                <td>{grade.subject.name}</td>
                <td>{grade.firstAssessment}</td>
                <td>{grade.secondAssessment}</td>
                <td>{grade.exam}</td>
                <td>{grade.total}</td>
                <td>{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Grade;