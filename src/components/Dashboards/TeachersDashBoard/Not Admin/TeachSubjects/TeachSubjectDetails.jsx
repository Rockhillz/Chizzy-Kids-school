import React, { useState, useEffect } from "react";
import { 
  Table, 
  Button, 
  Spinner, 
  Alert, 
  InputGroup, 
  FormControl,
  Modal 
} from "react-bootstrap";
import { FaSave, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";
import "./TeachSubject.css";

const TeachSubjectDetails = ({ subjectId, onBack }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [termName, setTermName] = useState("");
  const [termId, setTermId] = useState("");
  const [noTermOrSession, setNoTermOrSession] = useState(false);

  const [modalState, setModalState] = useState({ show: false, type: 'success', message: '' });
  const [loadingState, setLoadingState] = useState({});

  const showModal = (type, message) => {
    setModalState({ show: true, type, message });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const studentResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/students-by-subject/${subjectId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!studentResponse.ok) throw new Error("Failed to fetch students");
        const studentData = await studentResponse.json();

        const termResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/currentTerm-and-session`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!termResponse.ok) throw new Error("Failed to fetch term data");
        const termData = await termResponse.json();

        if (!termData || !termData.session || !termData.term) {
          setNoTermOrSession(true);
        } else {
          setSessionName(termData.session.sessionName || "Unknown Session");
          setTermName(termData.term.termName || "Unknown Term");
          setTermId(termData.term._id || "");
          setNoTermOrSession(false);
        }

        const marksResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/marks-by-subject/${subjectId}?termId=${termData.term._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!marksResponse.ok) throw new Error("Failed to fetch marks");
        const marksData = await marksResponse.json();

        const updatedStudents = studentData.students.map((student) => {
          const mark = marksData.marks.find(
            (m) => m.student === student.id && m.term === termData.term._id
          );
          return {
            ...student,
            firstAssessment: mark ? mark.firstAssessment : 0,
            secondAssessment: mark ? mark.secondAssessment : 0,
            exam: mark ? mark.exam : 0,
          };
        });

        setStudents(updatedStudents);
        setLoading(false);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [subjectId, termId]);
  

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
    if (totalMarks >= 85) return "A";
    if (totalMarks >= 70) return "B";
    if (totalMarks >= 60) return "C";
    if (totalMarks >= 50) return "D";
    if (totalMarks >= 40) return "E";
    return "F";
  };

  const handleSaveMarks = async (studentId) => {
    setLoadingState(prev => ({ ...prev, [studentId]: 'save' }));
    const student = students.find((s) => s.id === studentId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/mark/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: studentId,
            subject: subjectId,
            term: termId,
            firstAssessment: student.firstAssessment,
            secondAssessment: student.secondAssessment,
            exam: student.exam,
          }),
        }
      );

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

      showModal('success', 'Marks saved successfully!');
    } catch (error) {
      showModal('error', 'Failed to save marks. Please try again.');
    } finally {
      setLoadingState(prev => ({ ...prev, [studentId]: null }));
    }
  };

  const handleFinalizeMarks = async (studentId) => {
    setLoadingState(prev => ({ ...prev, [studentId]: 'finalize' }));
    const student = students.find((s) => s.id === studentId);
    const totalMarks =
      (student.firstAssessment || 0) +
      (student.secondAssessment || 0) +
      (student.exam || 0);
    const grade = calculateGrade(totalMarks);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/mark/finalize`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: studentId,
            subject: subjectId,
            term: termId,
            grade: grade,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to finalize marks");
      }

      showModal('success', 'Marks finalized successfully!');
    } catch (error) {
      showModal('error', 'Failed to finalize marks. Please try again.');
    } finally {
      setLoadingState(prev => ({ ...prev, [studentId]: null }));
    }
  };

  const handleUnfinalizeMarks = async (studentId) => {
    setLoadingState(prev => ({ ...prev, [studentId]: 'unfinalize' }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/mark/unfinalize`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: studentId,
            subject: subjectId,
            term: termId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unfinalize marks");
      }

      showModal('success', 'Marks unfinalized successfully!');
    } catch (error) {
      showModal('error', 'Failed to unfinalize marks. Please try again.');
    } finally {
      setLoadingState(prev => ({ ...prev, [studentId]: null }));
    }
  };

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-3"
      />
    );
  }
  
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Enter Student Scores</h1>
      {noTermOrSession ? (
        <Alert variant="warning">
          No term or session data is available. Please create terms and sessions first.
        </Alert>
      ) : (
        <>
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
                        <div className="icon-actions">
                          <Button
                            variant="primary"
                            className="icon-button me-2"
                            onClick={() => handleSaveMarks(student.id)}
                            disabled={loadingState[student.id] === 'save'}
                          >
                            {loadingState[student.id] === 'save' ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <FaSave />
                            )}
                          </Button>
                          <Button
                            variant="success"
                            className="icon-button me-2"
                            onClick={() => handleFinalizeMarks(student.id)}
                            disabled={loadingState[student.id] === 'finalize'}
                          >
                            {loadingState[student.id] === 'finalize' ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <FaCheckCircle />
                            )}
                          </Button>
                          <Button
                            variant="danger"
                            className="icon-button"
                            onClick={() => handleUnfinalizeMarks(student.id)}
                            disabled={loadingState[student.id] === 'unfinalize'}
                          >
                            {loadingState[student.id] === 'unfinalize' ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <FaTimesCircle />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}

      {/* Feedback Modal */}
      <Modal show={modalState.show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {modalState.type === 'success' ? (
              <FaCheckCircle className="text-success me-2" />
            ) : (
              <FaExclamationCircle className="text-danger me-2" />
            )}
            {modalState.type === 'success' ? 'Success' : 'Error'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalState.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeachSubjectDetails;