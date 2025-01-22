import React, { useState, useEffect } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const TeachClassroom = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [spinnings, setSpinnings] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");
  const [sessionName, setSessionName] = useState("");
  const [termName, setTermName] = useState("");
  const [termId, setTermId] = useState("");

  const getTeacherIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.teacherId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const teacherId = getTeacherIdFromToken();

  useEffect(() => {
    if (!teacherId) {
      setError("Teacher ID is missing or invalid.");
      return;
    }

    const fetchClassroom = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/classrooms-assigned-to-teacher`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        const termResponse = await fetch(
          `http://localhost:8080/api/currentTerm-and-session`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const termData = await termResponse.json();

        if (data.success && data.data) {
          setClassroom(data.data);

          const initialAttendance = {};
          data.data.students.forEach((student) => {
            initialAttendance[student.id] = "Absent";
          });
          setAttendance(initialAttendance);

          if (termResponse.ok && termData) {
            setSessionName(termData.session?.sessionName || "Unknown Session");
            setTermName(termData.termName || "Unknown Term");
            setTermId(termData._id || "");
          } else {
            setSessionName("No Session Available");
            setTermName("No Term Available");
            setTermId("");
          }
        } else {
          setError(data.message || "Failed to fetch classroom data.");
        }
      } catch (error) {
        console.error("Error fetching classroom:", error);
        setError("An error occurred while fetching classroom data.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, [teacherId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const submitAttendance = async () => {
    setSpinnings(true);

    try {
      const response = await fetch(
        "https://chizzykids-server.onrender.com/api/attendance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classroomId: classroom.id, attendance, term: termId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setModalMessage("Attendance submitted successfully!");
        setModalVariant("success");
        setShowModal(true);
      } else {
        setModalMessage(result.message || "Failed to submit attendance.");
        setModalVariant("danger");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setModalMessage("An unexpected error occurred. Please try again.");
      setModalVariant("danger");
      setShowModal(true);
    } finally {
      setSpinnings(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-5"
        style={{ width: "3rem", height: "3rem" }}
      />
    );
  }

  return (
    <div className="container-fluid py-4">
      {classroom ? (
        <>
          <div className="classroom-info mb-3 p-3 border rounded bg-light">
            <div className="row mb-2">
              <div className="col-6 col-md-4">
                <strong>Session: </strong> {sessionName}
              </div>
              <div className="col-6 col-md-4">
                <strong>Term:</strong> {termName}
              </div>
            </div>
            <h2 className="text-primary">
              <strong>{classroom.classroom}</strong>
            </h2>
            <h5>Teacher: <strong>{classroom.teacher}</strong></h5>
            <h5>Number of Students: <strong>{classroom.studentCount}</strong></h5>
          </div>

          <div className="attendance-list">
            <h2 className="mb-3">Student Attendance</h2>
            <ul className="list-group">
              {classroom.students.map((student) => (
                <li
                  key={student.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {student.name}
                  <select
                    className="form-select w-50 w-md-25"
                    value={attendance[student.id]}
                    onChange={(e) =>
                      handleAttendanceChange(student.id, e.target.value)
                    }
                  >
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                  </select>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary my-3 w-md-auto"
              onClick={submitAttendance}
              disabled={!termId || spinnings}
            >
              {spinnings ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Submit Attendance"
              )}
            </button>
          </div>

          <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalVariant === "success" ? "Success" : "Error"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <FaCheckCircle
                color={modalVariant === "success" ? "green" : "red"}
                size={40}
              />
              <p className="mt-3">{modalMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <div>No classroom data available.</div>
      )}
    </div>
  );
};

export default TeachClassroom;
