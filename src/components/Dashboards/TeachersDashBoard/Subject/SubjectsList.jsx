import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Modal, Form, Alert } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const SubjectsList = ({ setSelectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]); // New state for classrooms
  const [subjectClassrooms, setSubjectClassrooms] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(""); // Selected classroom
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [creating, setCreating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"
  const [feedbackMessage, setFeedbackMessage] = useState("");

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubjects(data.subjects || data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/classrooms`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch classrooms.");
      }

      const data = await response.json();
      setClassrooms(data.classrooms || []);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setFeedbackType("error");
      setFeedbackMessage("Error fetching classrooms. Please try again.");
      setShowFeedback(true);
    }
  };

  const handleCreateSubject = async () => {
    try {
      setCreating(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/createSubject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newSubject,
            classroom: selectedClassroom,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newSubj = await response.json();
      setSubjects((prevSubjects) => [...prevSubjects, newSubj]);
      await fetchSubjects();
      setFeedbackType("success");
      setFeedbackMessage("Subject created successfully!");
      setShowFeedback(true);
      setShowModal(false);
      setNewSubject("");
      setSelectedClassroom("");
    } catch (err) {
      setFeedbackType("error");
      setFeedbackMessage("Error creating subject. Please try again.");
      setShowFeedback(true);
      console.error("Error creating subject:", err);
    } finally {
      setCreating(false);
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

  if (subjects.length === 0) return <p>No subjects found</p>;

  return (
    <div className="table-responsive">
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h3 className="fs-5 fs-md-3 mb-2 mb-md-0">Subjects</h3>
        <Button
          variant="primary"
          className="bg-t btn-sm btn-md"
          onClick={() => {
            fetchClassrooms(); // Fetch classrooms when opening modal
            setShowModal(true);
          }}
        >
          Add Subject
        </Button>
      </div>

      <Table bordered hover responsive className="mb-0">
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Students Count</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject._id}
              onClick={() => setSelectedSubject(subject._id)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {subject.name}
                {" - "}
                {subject.classroom?.className}
              </td>
              <td>{subject.teacher ? subject.teacher.fullname : "N/A"}</td>
              <td>{subject.students ? subject.students.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for creating a subject */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="subjectName">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="classroomSelect" className="mt-3">
              <Form.Label>Assign to Classroom</Form.Label>
              <Form.Select
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                required
              >
                <option value="">Select Classroom</option>
                {classrooms.map((classroom) => (
                  <option key={classroom._id} value={classroom._id}>
                    {classroom.className}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateSubject}
            disabled={creating || !newSubject.trim() || !selectedClassroom}
          >
            {creating ? <Spinner animation="border" size="sm" /> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={showFeedback} onHide={() => setShowFeedback(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {feedbackType === "success" ? (
              <BsCheckCircleFill className="text-success me-2" />
            ) : (
              <AiFillCloseCircle className="text-danger me-2" />
            )}
            {feedbackType === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{feedbackMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowFeedback(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubjectsList;
