import React, { useState, useEffect } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa"; // Import the checkmark icon from react-icons

const TeachClassroom = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [ spinnings, setSpinnings] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Message to display in modal
  const [modalVariant, setModalVariant] = useState("success"); // Set the modal's variant (success or error)
  const [sessionName, setSessionName] = useState(""); // For session name
  const [termName, setTermName] = useState(""); // For term name
  const [termId, setTermId] = useState(""); // For term ID

  // Extract teacherId from the decoded JWT token stored in localStorage
  const getTeacherIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
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

        // Fetch terms and sessions
        const termResponse = await fetch(
          `https://chizzykids-server.onrender.com/api/currentTerm-and-session`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!termResponse.ok) {
          throw new Error("Failed to fetch terms and sessions");
        }
        const termData = await termResponse.json();

        if (data.success && data.data) {
          setClassroom(data.data);

          const initialAttendance = {};
          data.data.students.forEach((student) => {
            initialAttendance[student.id] = "Absent"; // Default to 'Absent'
          });
          setAttendance(initialAttendance);

          setSessionName(termData.session?.sessionName || "Unknown Session");
          setTermName(termData.termName || "Unknown Term");
          setTermId(termData._id || ""); // Store term ID
        } else {
          setError(data.message || "Failed to fetch classroom data.");
        }
      } catch (error) {
        console.error("Error fetching classroom:", error);
        setError("An error occurred while fetching classroom data.");
      } finally {
        setLoading(false); // Ensure spinner stops in case of error
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
      console.log("Submitting attendance:", {
        classroomId: classroom.id,
        attendance,
      });

      const response = await fetch(
        "http://localhost:8080/api/attendance",
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
        setShowModal(true); // Show success modal
      } else {
        setModalMessage(result.message || "Failed to submit attendance.");
        setModalVariant("danger"); // If failed, show error modal
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
    setShowModal(false); // Close the modal
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
    <div className="container py-1">
      {classroom ? (
        <>
          <div className="classroom-info mb-2 p-3 border rounded bg-light">
            <div className="d-flex mb-2">
              <div className="me-4">
                <strong>Session: </strong> {sessionName}
              </div>
              <div>
                <strong>Term:</strong> {termName}
              </div>
            </div>
            <h2 className="text-primary">
              <strong>{classroom.classroom}</strong>
            </h2>

            <h5>
              Teacher: <strong>{classroom.teacher}</strong>
            </h5>
            <h5>
              Number of Students: <strong>{classroom.studentCount}</strong>
            </h5>
          </div>

          <div className="attendance-list">
            <h2 className="mb-2">Student Attendance</h2>
            <ul className="list-group">
              {classroom.students.map((student) => (
                <li
                  key={student.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ fontSize: "1.1rem" }}
                >
                  {student.name}
                  <select
                    className="form-select w-25"
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
            <button className="btn btn-primary my-2" onClick={submitAttendance} disabled={spinnings}>
              {
                spinnings? (
                  <Spinner animation="border" variant="primary" />
                ) : ("Submit Attendance")
              }
            </button>
          </div>

          {/* Modal for success or error */}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalVariant === "success" ? "Success" : "Error"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                {/* Displaying a checkmark icon for success */}
                <FaCheckCircle
                  color={modalVariant === "success" ? "green" : "red"}
                  size={40}
                />
                <p>{modalMessage}</p>
              </div>
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
