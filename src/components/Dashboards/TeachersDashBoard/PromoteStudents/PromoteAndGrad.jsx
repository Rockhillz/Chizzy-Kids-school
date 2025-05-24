import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function PromoteAndGrad() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePromotion = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/promoteStudents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setMessage('Promotion completed successfully!');
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('An error occurred during promotion.');
    } finally {
      setLoading(false);
      setShowModal(false); // Now closes only after completion

    }
  };

  return (
    <div>
      <h2>Promote and Graduate Students</h2>
      <p>
        This section allows administrators to promote students to higher classes and graduate them from the school.
      </p>
      <Button className='bg-t' onClick={() => setShowModal(true)}>
        Promote Students
      </Button>

      {message && <p className="mt-3">{message}</p>}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to promote and graduate students?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handlePromotion} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Processing...
              </>
            ) : (
              'Yes, Promote'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PromoteAndGrad;