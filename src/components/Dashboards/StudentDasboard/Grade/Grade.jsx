import React, { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Button } from "react-bootstrap";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [termId, setTermId] = useState("");
  const [termName, setTermName] = useState("");
  const [sessionName, setSessionName] = useState("");

  const token = localStorage.getItem("token");

  // decoding the token for student ID
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

  const fetchGrades = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/student/grades/${studentId}`,
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

  const fetchTermAndSession = async () => {
    try {
      const termResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/currentTerm-and-session`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const termData = await termResponse.json();

      if (termResponse.ok && termData) {
        setSessionName(termData.session.sessionName || "Unknown Session");
        setTermName(termData.term.termName || "Unknown Term");
        setTermId(termData.term._id || "");
      } else {
        setSessionName("No Session Available");
        setTermName("No Term Available");
        setTermId("");
      }
    } catch (error) {
      console.error("Error fetching term and session:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
    fetchTermAndSession();
  }, []);

  const handlePrintResult = async () => {
    try {
      // Construct the URL for the report endpoint
      const reportUrl = `${import.meta.env.VITE_API_BASE_URL}/report/${studentId}/${termId}`;
  
      // Open the report in a new tab
      const newWindow = window.open(reportUrl, "_blank");
  
      if (newWindow) {
        // Wait for the new window to load
        newWindow.onload = async () => {

          try {
            // Fetch the report with the authorization token
            const response = await fetch(reportUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response.ok) {
              // Handle the PDF file (e.g., display or download)
              const blob = await response.blob();
              const pdfUrl = URL.createObjectURL(blob);
              newWindow.location.href = pdfUrl;
            } else {
              console.error("Failed to fetch the report");
              newWindow.close();
            }
          } catch (error) {
            console.error("Error fetching the report:", error);
            newWindow.close();
          }
        };
      }
    } catch (error) {
      console.error("Error opening the report window:", error);
    }
  };

  return (
    <Container>
      <div className="mb-3 mt-2 p-3 border rounded bg-light">
        <div className="row mb-2">
          <div className="col-6 col-md-4">
            <strong>Session: </strong> {sessionName}
          </div>
          <div className="col-6 col-md-4">
            <strong>Term:</strong> {termName}
          </div>
        </div>
        <h2 className="text-dark">
          <strong>Subject Grades</strong>
        </h2>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && !grades.length && (
        <Alert variant="info">No grades available for the current term.</Alert>
      )}

      {!loading && !error && grades.length > 0 && (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Subject</th>
                <th>CA1</th>
                <th>CA2</th>
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
          <Button variant="primary" className="bg-t" onClick={handlePrintResult}>
            Generate Report
          </Button>
        </>
      )}
    </Container>
  );
};

export default Grade;