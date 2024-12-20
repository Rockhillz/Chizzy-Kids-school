import { useState, useEffect } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import AssignClass from "./Assignings/AssignClass";
import AssignSubject from "./Assignings/AssignSubject";

const TeacherProfile = ({ teacherId, onBack }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false); // Modal state
  const [showAssignSubject, setShowAssignSubject] = useState(false); // Subject state
  const [assignLoading, setAssignLoading] = useState(false); // Spinner for "Assign" button

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/singleTeacher/${teacherId}`,
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

  if (loading) return <p>Loading teacher profile...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Back to Teachers List
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
        <Button
          variant="outline-primary"
          onClick={() => setShowAssignModal(true)} // Show modal
        >
          Assign To Class
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => setShowAssignSubject(true)} // Show modal
        >
          Assign To Subject
        </Button>
        <Button variant="outline-danger">Delete Teacher</Button>
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
    </div>
  );
};

export default TeacherProfile;
