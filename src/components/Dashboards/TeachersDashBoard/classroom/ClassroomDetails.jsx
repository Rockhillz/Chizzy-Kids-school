import { useState, useEffect } from "react";
import { Button, Col, Spinner, Modal, Form, Toast, Row } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";

const ClassroomDetails = ({ ClassroomId, onBack }) => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showRemoveAssign, setShowRemoveAssign] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showRemoveTeacherModal, setShowRemoveTeacherModal] = useState(false);
  const [removeTeacherLoading, setRemoveTeacherLoading] = useState(false);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/classroom/${ClassroomId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error(`Error fetching classroom: ${response.status}`);
        const data = await response.json();
        setClassroom(data.classroom);
      } catch (err) {
        console.error("Error fetching classroom:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, [ClassroomId]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/subjects`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error(`Error fetching subjects: ${response.status}`);

        const data = await response.json();

        setSubjects(data.subjects || data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  //Assign Subjects to classroom
  const handleAssign = async () => {
    setAssignLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/assign-subjects-classroom`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classId: ClassroomId,
            subjectIds: selectedSubjects,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error assigning subjects");
        throw new Error("Failed to assign subjects");
      }

      setModalMessage("Subjects assigned successfully.");
      setShowToast(true);
      setShowAssignModal(false);
    } catch (err) {
      console.error("Error assigning subjects:", err);
      setModalMessage("Failed to assign subjects. Please try again later.");
    } finally {
      setAssignLoading(false);
    }
  };

  // Remove subjects from classroom
  const handleRemoveAssignedSubjects = async () => {
    setRemoveLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/remove-subjects-classroom`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classId: ClassroomId,
            subjectIds: selectedSubjects,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error removing assigned subjects");
        throw new Error("Failed to remove assigned subjects");
      }

      setModalMessage("Subjects removed successfully.");
      setShowToast(true);
      setShowRemoveAssign(false);
    } catch (err) {
      console.error("Error removing assigned subjects:", err);
      setModalMessage("Failed to remove assigned subjects. Please try again later.");
    } finally {
      setRemoveLoading(false);
    }
  };

  // handle subject Selection
  const handleSubjectSelection = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Handle removing of teacher from classroom
  const handleRemoveTeacher = async () => {
    setRemoveTeacherLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/classroom/remove-teacher`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classroomId: ClassroomId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to remove teacher");

      setModalMessage("Teacher removed successfully.");
      setShowToast(true);
      setShowRemoveTeacherModal(false);
    } catch (err) {
      console.error("Error removing teacher:", err);
      setModalMessage("Failed to remove teacher. Please try again later.");
    } finally {
      setRemoveTeacherLoading(false);
    }
  };

  // Handle deletion of of classroom
  const handleDeleteClassroom = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/delete-classroom/${ClassroomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setModalMessage("Classroom deleted successfully.");
        setDeleteSuccessful(true);
      } else {
        const errorData = await response.json();
        setModalMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error deleting classroom:", err);
      setModalMessage("Failed to delete classroom. Please try again later.");
    } finally {
      setDeleteLoading(false);
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

  if (!classroom) {
    return <p>Classroom not found</p>;
  }

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Classrooms List
      </Button>
      <h3 className="text-center text-primary mb-4">Classroom Details</h3>
      <div>
        <p>
          <strong>Classname:</strong> {classroom.className}
        </p>
        <p>
          <strong>Teacher:</strong>{" "}
          {classroom.teacher ? classroom.teacher.fullname : "N/A"}
        </p>
        <h4 className="mt-4">Students:</h4>
        {classroom.students && classroom.students.length > 0 ? (
          <ul>
            {classroom.students.map((student) => (
              <li key={student._id}>{student.fullname}</li>
            ))}
          </ul>
        ) : (
          <p>No students enrolled in this class.</p>
        )}
        <h4 className="mt-4">Subjects:</h4>
        {classroom.subjects && classroom.subjects.length > 0 ? (
          <ul>
            {classroom.subjects.map((subject) => (
              <li key={subject._id}>{subject.name}</li>
            ))}
          </ul>
        ) : (
          <p>No subjects assigned to this class.</p>
        )}
      </div>

      <Row className="g-2 mt-4">
        <Col xs={12} md={4}>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setShowAssignModal(true)}
          >
            Assign Subject(s)
          </Button>
        </Col>

        <Col xs={12} md={4}>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setShowRemoveAssign(true)}
          >
            Remove Assigned Subject(s)
          </Button>
        </Col>

        <Col xs={12} md={3}>
          <Button variant="outline-warning" className="w-100" onClick={() => setShowRemoveTeacherModal(true)}>
            Remove Teacher
          </Button>
        </Col>

        <Col xs={12} md={4}>
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Classroom
          </Button>
        </Col>
      </Row>

      {/* Assign Subject Modal */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Subject(s) to Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subjects.length > 0 ? (
            <Form>
              {subjects.map((subject) => (
                <Form.Check
                  key={subject._id}
                  type="checkbox"
                  id={subject._id}
                  label={subject.name}
                  onChange={() => handleSubjectSelection(subject._id)}
                />
              ))}
            </Form>
          ) : (
            <Spinner
              animation="border"
              variant="primary"
              className="d-block mx-auto"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAssignModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssign}
            disabled={assignLoading}
          >
            {assignLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Assign"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove Assigned Subject Modal */}
      <Modal
        show={showRemoveAssign}
        onHide={() => setShowRemoveAssign(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Assigned Subject(s) from Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {classroom.subjects && classroom.subjects.length > 0 ? (
            <Form>
              {classroom.subjects.map((subject) => (
                <Form.Check
                  key={subject._id}
                  type="checkbox"
                  id={subject._id}
                  label={subject.name}
                  onChange={() => handleSubjectSelection(subject._id)}
                />
              ))}
            </Form>
          ) : (
            <p>No subjects assigned to this class.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRemoveAssign(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleRemoveAssignedSubjects}
            disabled={removeLoading}
          >
            {removeLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Remove"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove Teacher Modal */}
      <Modal show={showRemoveTeacherModal} onHide={() => setShowRemoveTeacherModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove the assigned teacher from this classroom? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveTeacherModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveTeacher} disabled={removeTeacherLoading}>
            {removeTeacherLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Remove Teacher"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Classroom Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteSuccessful ? <BsCheckCircleFill /> : "Delete Classroom"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {modalMessage ||
              "Are you sure you want to delete this classroom and all its data? This action cannot be undone."}
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
                onClick={handleDeleteClassroom}
                disabled={deleteLoading}
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

      {/* Toast for Success Message */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Toast.Header>
          <BsCheckCircleFill className="me-2 text-success" />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{modalMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ClassroomDetails;
