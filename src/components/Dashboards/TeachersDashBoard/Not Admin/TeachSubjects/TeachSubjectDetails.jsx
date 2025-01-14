import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const TeachSubjectDetails = ({ subjectId, onBack }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionName, setSessionName] = useState(""); // For session name
  const [termName, setTermName] = useState(""); // For term name
  const [termId, setTermId] = useState(""); // For term ID

  // Fetch students, session, and term details
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/students-by-subject/${subjectId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();

        // Fetch terms and sessions
      const termResponse = await fetch(
        `https://chizzykids-server.onrender.com/api/currentTerm-and-session`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      if (!termResponse.ok) {
        throw new Error("Failed to fetch terms and sessions");
      }
      const termData = await termResponse.json();
     

        setStudents(data.students || []);
        setSessionName(termData.session?.sessionName || "Unknown Session");
        setTermName(termData.termName || "Unknown Term");
        setTermId(termData._id || ""); // Store term ID
        setLoading(false);
      } catch (error) {
        setError("Failed to load students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [subjectId]);

  const handleMarkChange = (studentId, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, [field]: Math.min(field === "exam" ? 60 : 20, value) }
          : student
      )
    );
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 85) return "A"; // 85 - 100
    if (totalMarks >= 70) return "B"; // 70 - 84
    if (totalMarks >= 60) return "C"; // 60 - 69
    if (totalMarks >= 50) return "D"; // 50 - 59
    if (totalMarks >= 40) return "E"; // 40 - 49
    return "F"; // 0 - 39
  };

  const handleSaveMarks = async (studentId) => {
    const student = students.find((s) => s.id === studentId);

    try {
      const response = await fetch("https://chizzykids-server.onrender.com/api/mark/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          subject: subjectId,
          term: termId, // Include termId
          firstAssessment: student.firstAssessment,
          secondAssessment: student.secondAssessment,
          exam: student.exam,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save marks");
      }

      const data = await response.json();
      const updatedMark = data.mark;

      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === updatedMark.student
            ? {
                ...s,
                firstAssessment: updatedMark.firstAssessment,
                secondAssessment: updatedMark.secondAssessment,
                exam: updatedMark.exam,
              }
            : s
        )
      );

      alert("Marks saved successfully!");
    } catch (error) {
      alert("Failed to save marks.");
    }
  };

  const handleFinalizeMarks = async (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const totalMarks =
      (student.firstAssessment || 0) +
      (student.secondAssessment || 0) +
      (student.exam || 0);
    const grade = calculateGrade(totalMarks);

    try {
      const response = await fetch("https://chizzykids-server.onrender.com/api/mark/finalize", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          subject: subjectId,
          term: termId, // Include termId
          grade: grade,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize marks");
      }

      alert("Marks finalized successfully!");
    } catch (error) {
      alert("Failed to finalize marks.");
    }
  };

  const handleUnfinalizeMarks = async (studentId) => {
    try {
      const response = await fetch(
        "https://chizzykids-server.onrender.com/api/mark/unfinalize",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: studentId,
            subject: subjectId,
            term: termId, // Include termId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unfinalize marks");
      }

      alert("Marks unfinalized successfully!");
    } catch (error) {
      alert("Failed to unfinalize marks.");
    }
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-3"
      />
    );
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Enter Student Scores</h1>
      <div className="d-flex mb-4">
        <div className="me-4">
          <strong>Session: </strong> {sessionName}
        </div>
        <div>
          <strong>Term:</strong> {termName}
        </div>
      </div>
      <Button variant="secondary" className="mb-3" onClick={onBack}>
        Back to Subjects
      </Button>
      {students.length === 0 ? (
        <Alert variant="info">No students enrolled in this subject.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student</th>
              <th>CA 1</th>
              <th>CA 2</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const totalMarks =
                (student.firstAssessment || 0) +
                (student.secondAssessment || 0) +
                (student.exam || 0);
              const grade = calculateGrade(totalMarks);

              return (
                <tr key={student.id}>
                  <td>{student.name || "No Name Provided"}</td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.firstAssessment || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "firstAssessment",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.secondAssessment || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "secondAssessment",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.exam || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "exam",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>{totalMarks}</td>
                  <td>{grade}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => handleSaveMarks(student.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleFinalizeMarks(student.id)}
                      disabled={student.finalized}
                    >
                      Finalize
                    </Button>
                    {student.finalized && (
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleUnfinalizeMarks(student.id)}
                      >
                        Unfinalize
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TeachSubjectDetails;
