import { useState, useEffect } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";

function TermAndSession() {
  const [newSession, setNewSession] = useState("");
  const [newTermName, setNewTermName] = useState("");
  const [currentSession, setCurrentSession] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [termName, setTermName] = useState("First Term");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingSession, setLoadingSession] = useState(false); // For Create Session spinner
  const [loadingTerm, setLoadingTerm] = useState(false); // For Create Term spinner

  useEffect(() => {
    const fetchCurrentSession = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/currentTerm-and-session",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch current session");
        }
        const data = await response.json();
        console.log("data: ", data);
        setCurrentSession(data.session.sessionName);
        setCurrentSessionId(data.session._id);
        setTermName(data.termName);
      } catch (error) {
        console.error("Error fetching current session:", error);
        setErrorMessage(
          "Unable to fetch current session. Please try again later."
        );
      }
    };

    fetchCurrentSession();
  }, []);

  const handleCreateSession = async () => {
    setLoadingSession(true); // Start spinner
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/createSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionName: newSession }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      setSuccessMessage("Session created successfully!");
      setErrorMessage(""); // Clear any previous errors
      setNewSession(""); // Reset input
    } catch (error) {
      console.error("Error creating session:", error);
      setErrorMessage("Unable to create session. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoadingSession(false); // Stop spinner
    }
  };

  const handleCreateTerm = async () => {
    const token = localStorage.getItem("token");

    setLoadingTerm(true); // Start spinner
    try {
      const response = await fetch("http://localhost:8080/api/createTerm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          termName: newTermName,
          sessionId: currentSessionId, // Pass the current session ID directly
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create term");
      }

      setSuccessMessage("Term created successfully!");
      setErrorMessage(""); // Clear any previous errors
      setNewTermName(""); // Reset term selection
      setStartDate(""); // Reset dates
      setEndDate("");
    } catch (error) {
      console.error("Error creating term:", error);
      setErrorMessage("Unable to create term. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoadingTerm(false); // Stop spinner
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h5>Current Session: {currentSession || "No session available"}</h5>
        <h5>Current Term: {termName || "No term selected"}</h5>
      </div>

      <Button
        variant="primary"
        className="me-2"
        onClick={() => setShowSessionModal(true)}
      >
        Create Session
      </Button>

      <Button variant="primary" onClick={() => setShowTermModal(true)}>
        Create Term
      </Button>

      {/* Create Session Modal  */}
      <Modal
        show={showSessionModal}
        onHide={() => {
          setShowSessionModal(false);
          setSuccessMessage("");
          setErrorMessage("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Session (e.g., 2024/2025)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form>
            <Form.Group controlId="sessionId">
              <Form.Control
                type="text"
                placeholder="Enter Session"
                value={newSession}
                onChange={(e) => setNewSession(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSessionModal(false)}
          >
            Close
          </Button>

          <Button variant="primary" onClick={handleCreateSession}>
            {loadingSession ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Create"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Term Modal */}
      <Modal
        show={showTermModal}
        onHide={() => {
          setShowTermModal(false);
          setSuccessMessage("");
          setErrorMessage("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Term</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form>
            <Form.Group controlId="termName">
              <Form.Label>Term</Form.Label>
              <Form.Control
                as="select"
                value={newTermName}
                onChange={(e) => setNewTermName(e.target.value)}
              >
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="currentSession">
              <Form.Label>Current Session</Form.Label>
              <Form.Control type="text" value={currentSession} readOnly />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermModal(false)}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              handleCreateTerm();
            }}
          >
            {loadingTerm ? <Spinner animation="border" size="sm" /> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TermAndSession;
