// import React, { useState } from 'react';
// import { Modal, Button, Spinner } from 'react-bootstrap';

// function PromoteAndGrad() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handlePromotion = async () => {
//     setLoading(true);
//     setMessage('');
//     setShowModal(false); // Close modal before sending the request

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/promoteStudents`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (response.ok) {
//         setMessage('Promotion completed successfully!');
//       } else {
//         const errorText = await response.text();
//         setMessage(`Error: ${errorText}`);
//       }
//     } catch (error) {
//       setMessage('An error occurred during promotion.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Promote and Graduate Students</h2>
//       <p>
//         This section allows administrators to promote students to higher classes and graduate them from the school.
//       </p>
//       <Button className='bg-t' onClick={() => setShowModal(true)}>
//         Promote Students
//       </Button>

//       {message && <p className="mt-3">{message}</p>}

//       {/* Confirmation Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Promotion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Do you want to promote and graduate students?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             No
//           </Button>
//           <Button variant="danger" onClick={handlePromotion} disabled={loading}>
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" /> Processing...
//               </>
//             ) : (
//               'Yes, Promote'
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default PromoteAndGrad;
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./Promotion.css";

const PromoteButtonGroup = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [classToPromote, setClassToPromote] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // Error modal state

  const promoteClass = async (className) => {
    setClassToPromote(className); // Set the class to be promoted
    setShowModal(true);
  };

  const handleConfirmPromotion = async () => {
    setLoading(true); // Start loading when the promotion starts
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/promotion/promote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ fromClassName: classToPromote }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        setShowModal(false); // Close the modal after promotion
        setShowSuccessModal(true); // Show success modal if the promotion is successful
      } else {
        setShowModal(false); // Close the modal without promotion
        setShowErrorModal(true); // Show error modal if the promotion fails
        console.log(data.message); // Log any message returned by the API
      }
    } catch (error) {
      console.error("Error during promotion:", error);
      setShowModal(false); // Close the modal if an error occurs
      setShowErrorModal(true); // Show error modal if the promotion fails
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };
  

  return (
    <div>
      <h6>Start Promoting from the top</h6>
      <div className="promotion-buttons">
        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("SSS3")}
          disabled={loading}
        >
          Graduate SSS3 Students
        </Button>

        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("SSS2")}
          disabled={loading}
        >
          SSS2 Students
        </Button>

        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("SSS1")}
          disabled={loading}
        >
          SSS1 Students
        </Button>


        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("JSS3")}
          disabled={loading}
        >
          JSS3 Students
        </Button>

        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("JSS2")}
          disabled={loading}
        >
          JSS2 Students
        </Button>

        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("JSS1")}
          disabled={loading}
        >
          JSS1 Students
        </Button>

        <Button
          className="promotion-button"
          variant="outline-primary"
          onClick={() => promoteClass("PRIMARY6")}
          disabled={loading}
        >
          Primary 6 Students
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to promote students from {classToPromote} to the next class?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmPromotion}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Promoting...
              </>
            ) : (
              "Yes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Promotion Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The students from {classToPromote} have been successfully promoted to the next class!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Something went wrong while promoting students from {classToPromote}. Please try again later.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PromoteButtonGroup;
