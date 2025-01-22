import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function TermAndSession() {
  const [isSessionModalOpen, setSessionModalOpen] = useState(false);
  const [isTermModalOpen, setTermModalOpen] = useState(false);
  const [newSession, setNewSession] = useState(false);
  const [currentSession, setCurrentSession] = useState("");

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);

  // Fetch current session from the endpoint

  async function fetchCurrentSession() {
    try {
      const response = await fetch("/api/sessions/current"); // Replace with your endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch current session");
      }
      const data = await response.json();
      setCurrentSession(data.session);
      setTermDetails((prev) => ({ ...prev, session: data.session }));
    } catch (error) {
      console.error("Error fetching current session:", error);
    }
  }

  const handleCreateSession = async () => {
    try {
      const response = await fetch("/api/sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create session");
      }
      alert("Session created successfully");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleCreateTerm = async () => {
    try {
      const response = await fetch("/api/terms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(termDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to create term");
      }
      alert("Term created successfully");
      setTermModalOpen(false);
    } catch (error) {
      console.error("Error creating term:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setSessionModalOpen(true)}>Create Session</button>
      <button onClick={() => setTermModalOpen(true)}>Create Term</button>

      <Button variant="primary" onClick={setShowSessionModal}>
        Create Session
      </Button>

      <Button variant="primary" onClick={setShowTermModal}>
        Create Term
      </Button>

      {/* Create Session Modal  */}
      <Modal
        show={showSessionModal}
        onHide={() => setShowSessionModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Session (eg.: 2024/25)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTermModal}
        onHide={() => setShowTermModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Term</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="term">
                <Form.Control
                  type="text"
                  
                  required
                >
                <option value="">Select Term</option>
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
                </Form.Control>

            </Form.Group>


            <Form.Group controlId="currentSession">
              {/* Select Term From Dropdown */}
              {/* <option value="">Select Current Session</option>
              {currentSession.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.sessionName}
                </option>
              ))} */}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Create Term Modal */}
      {/* {isTermModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Term</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTerm();
              }}
            >
              <label>
                Term:
                <select
                  value={termDetails.term}
                  onChange={(e) => setTermDetails({ ...termDetails, term: e.target.value })}
                >
                  <option value="First Term">First Term</option>
                  <option value="Second Term">Second Term</option>
                  <option value="Third Term">Third Term</option>
                </select>
              </label>
              <br />
              <label>
                Session:
                <input type="text" value={currentSession} readOnly />
              </label>
              <br />
              <label>
                Start Date:
                <input
                  type="date"
                  value={termDetails.startDate}
                  onChange={(e) => setTermDetails({ ...termDetails, startDate: e.target.value })}
                />
              </label>
              <br />
              <label>
                End Date:
                <input
                  type="date"
                  value={termDetails.endDate}
                  onChange={(e) => setTermDetails({ ...termDetails, endDate: e.target.value })}
                />
              </label>
              <br />
              <button type="submit">Create</button>
              <button type="button" onClick={() => setTermModalOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default TermAndSession;
