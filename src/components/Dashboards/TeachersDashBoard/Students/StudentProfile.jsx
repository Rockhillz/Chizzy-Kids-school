import { useState, useEffect } from "react";
import { Button, Col, Modal, Spinner } from "react-bootstrap";
import AssignStudentClass from "./Assignings/AssignStudentClass"; // Update the import path as needed

const StudentProfile = ({ studentId, onBack }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false); // Spinner for "Assign" button
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // For deletion success or error
  const [deleteSuccessful, setDeleteSuccessful] = useState(false); // Tracks delete status
  const [deleteLoading, setDeleteLoading] = useState(false);


  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/single-student/${studentId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setStudent(data.student);
      } catch (err) {
        console.error("Error fetching Student profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Handle delete student
  const handleDeleteStudent = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/delete/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setModalMessage("Student deleted successfully.");
        setDeleteSuccessful(true);
      } else {
        const errorData = await response.json();
        setModalMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      setModalMessage("Failed to delete student. Please try again later.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button
        variant="outline-primary"
        className="mb-3"
        onClick={onBack} // Navigate back
      >
        Student Lists
      </Button>

      <h3 className="text-center text-primary mb-4">Student Profile</h3>
      <div className="align-items-center d-flex">
        <Col md={4} className="text-center">
          <img
            src={student.image || "https://via.placeholder.com/250"}
            alt="Profile"
            className="img-fluid rounded-circle shadow"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Col>
        <div md={8}>
          <p>
            <strong>Full Name:</strong> {student.fullname}
          </p>
          <p>
            <strong>Student ID:</strong> {student.studentID}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Address:</strong> {student.address || "Not available"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(student.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Department:</strong> {student.department || "N/A"}
          </p>
          <p>
            <strong>Classroom:</strong>{" "}
            {student.classroom ? student.classroom.className : "Not assigned"}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        {/* Assign to Class */}
        <Button
          variant="outline-primary"
          onClick={() => setShowAssignModal(true)}
        >
          Assign To Class
        </Button>

        {/* Delete Student */}
        <Button
          variant="outline-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Student
        </Button>
      </div>

      {/* Assign Class Modal */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Student to Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignStudentClass
            studentId={studentId}
            onClose={() => setShowAssignModal(false)} // Close modal after assign
            setAssignLoading={setAssignLoading} // Control spinner
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteSuccessful ? "Success" : "Delete Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {modalMessage || "Are you sure you want to delete this student? This action cannot be undone"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {!deleteSuccessful ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteStudent}
                disabled={deleteLoading} // Disable button while loading
              >
                {deleteLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                setShowDeleteModal(false);
                onBack();
              }}
            >
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentProfile;
