
import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Modal, Form, Alert } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const ClassroomsList = ({ setSelectedClassroom }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newClassroom, setNewClassroom] = useState("");
  const [creating, setCreating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/classrooms`,
          {
            method: "GET",
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
        setClassrooms(data.classrooms || []);
      } catch (err) {
        console.error("Error fetching classrooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const handleClassroomClick = (classroomId) => {
    setSelectedClassroom(classroomId);
  };

  const handleCreateClassroom = async () => {
    try {
      setCreating(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://chizzykids-server.onrender.com/api/create-classroom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ className: newClassroom }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newClass = await response.json();
      setClassrooms((prevClassrooms) => [...prevClassrooms, newClass]);
      setFeedbackType("success");
      setFeedbackMessage("Classroom created successfully!");
      setShowFeedback(true);
      setShowModal(false);
      setNewClassroom("");
    } catch (err) {
      setFeedbackType("error");
      setFeedbackMessage("Error creating classroom. Please try again.");
      setShowFeedback(true);
      console.error("Error creating classroom:", err);
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

  return (
    <div className="table-responsive">
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h3 className="fs-5 fs-md-3 mb-2 mb-md-0">Classrooms</h3>
        <Button
          className="bg-t btn-sm btn-md"
          onClick={() => setShowModal(true)}
        >
          Add Classroom
        </Button>
      </div>

      <Table bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Classroom</th>
            <th>Number of Students</th>
            <th>Number of Subjects</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr
              key={classroom._id}
              className="h-100 shadow-sm"
              onClick={() => handleClassroomClick(classroom._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{classroom.className}</td>
              <td>
                {classroom.studentsCount || classroom.students?.length || 0}
              </td>
              <td>
                {classroom.subjectsCount || classroom.subjects?.length || 0}
              </td>
              <td>{classroom.teacher?.fullname || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for creating a classroom */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="className">
              <Form.Label>Classroom Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter classroom name"
                value={newClassroom}
                onChange={(e) => setNewClassroom(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateClassroom}
            disabled={creating || !newClassroom.trim()}
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

export default ClassroomsList;
