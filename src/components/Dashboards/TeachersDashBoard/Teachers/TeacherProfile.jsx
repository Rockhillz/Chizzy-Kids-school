import { useState, useEffect } from "react";
import { Button, Col, Modal, Spinner } from "react-bootstrap";
import AssignClass from "./Assignings/AssignClass";
import AssignSubject from "./Assignings/AssignSubject";

const TeacherProfile = ({ teacherId, onBack }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false); // Modal state
  const [showAssignSubject, setShowAssignSubject] = useState(false); // Subject state
  const [assignLoading, setAssignLoading] = useState(false); // Spinner for "Assign" button
  const [showDeleteModal, setShowDeleteModal] = useState(false); // for deleting teacher
  const [modalMessage, setModalMessage] = useState("");
  const [deleteSuccessful, setDeleteSuccessful] = useState(false); // Tracks if the deletion was successful
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/singleTeacher/${teacherId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if required
            },
          }
        );

        const data = await response.json();
        setTeacher(data.teacher);
      } catch (err) {
        console.error("Error fetching teacher profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handleDeleteTeacher = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://chizzykids-server.onrender.com/api/deleteTeacher/${teacherId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setModalMessage("Teacher deleted successfully.");
        setDeleteSuccessful(true);
      } else {
        const errorData = await response.json();
        setModalMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      setModalMessage("Failed to delete teacher. Please try again later.");
    } finally {
        setDeleteLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Back
      </Button>
      <h3 className="text-center text-primary mb-4">Teacher Profile</h3>
      <div className="align-items-center d-flex">
        <Col md={4} className="text-center">
          <img
            src={teacher.image || "https://via.placeholder.com/250"}
            alt="Profile"
            className="img-fluid rounded-circle shadow"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Col>
        <div md={8}>
          <p>
            <strong>Full Name:</strong> {teacher.fullname}
          </p>
          <p>
            <strong>Employee ID:</strong> {teacher.employeeID}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.phone}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address || "Not available"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(teacher.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Department:</strong> {teacher.department || "N/A"}
          </p>
          <p>
            <strong>Classroom:</strong>{" "}
            {teacher.classroom ? teacher.classroom.className : "Not assigned"}
          </p>

          <p>
            <div>
              <strong>Assigned Subjects: </strong>
              {teacher.subjects && teacher.subjects.length > 0 ? (
                teacher.subjects.map((subject) => (
                  <span key={subject._id}>{subject.name}. </span>
                ))
              ) : (
                <span> No subjects assigned.</span>
              )}
            </div>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between">

        {/*Assigning Class */}
        <Button
          variant="outline-primary"
          onClick={() => setShowAssignModal(true)} // Show modal
        >
          Assign To Class
        </Button>

        {/* Assigning Subject */}
        <Button
          variant="outline-primary"
          onClick={() => setShowAssignSubject(true)} // Show modal
        >
          Assign To Subject
        </Button>

        {/* Deleting teacher  */}
        <Button
          variant="outline-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Teacher
        </Button>
      </div>

      {/* Modal for Assigning Class */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Teacher to Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignClass
            teacherId={teacherId}
            onClose={() => setShowAssignModal(false)} // Close modal after assign
            setAssignLoading={setAssignLoading} // Control spinner
          />
        </Modal.Body>
      </Modal>

      {/* Modal for Assigning Subject */}
      <Modal
        show={showAssignSubject}
        onHide={() => setShowAssignSubject(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Teacher to Subject</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AssignSubject
            teacherId={teacherId}
            onClose={() => setShowAssignSubject(false)} // Close modal after assign
            setAssignLoading={setAssignLoading} // Control spinner
          />
        </Modal.Body>
      </Modal>

      {/* Modal for deleting teacher */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteSuccessful ? "Success" : "Delete Teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage || "Are you sure you want to delete this teacher? This action cannot be undone."}</p>
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
                onClick={handleDeleteTeacher}
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
                onBack(); // Redirect to the teacher list
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

export default TeacherProfile;
