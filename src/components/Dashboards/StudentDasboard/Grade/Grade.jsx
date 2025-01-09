import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getStudentIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      console.log("Token from localStorage:", token);

      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      // Decode the payload (second part) from base64
      const payload = atob(parts[1]);

      // Parse the payload as JSON
      const decodedToken = JSON.parse(payload);

      console.log("Decoded Token:", decodedToken);

      // Extract the studentId from the decoded token and return it
      return decodedToken.studentId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const studentId = getStudentIdFromToken();
  console.log("Student ID from token:", studentId);

  useEffect(() => {
    if (!studentId) {
      setError("No student ID found in token");
      setLoading(false);
      return;
    }

    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage again
        const response = await fetch(
          `http://localhost:8080/api/student/grades`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from localStorage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }

        const data = await response.json();
        console.log("Data: ", data);
        setGrades(data);
      } catch (err) {
        setError(err.message);
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentId]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-3"
      />
    );

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="mt-4">
      <h2>Grades</h2>
      <Table striped bordered hover responsive>
        <thead>
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
          {grades.map((mark, index) => (
            <tr key={index}>
              <td>{mark.subjectName}</td>
              <td>{mark.firstAssessment}</td>
              <td>{mark.secondAssessment}</td>
              <td>{mark.exam}</td>
              <td>{mark.total}</td>
              <td>{mark.grade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Grade;
