// import { useState, useEffect } from "react";
// import { Button, Col, Spinner, Modal, Form } from "react-bootstrap";
// import { BsCheckCircleFill } from "react-icons/bs";

// const ClassroomDetails = ({ ClassroomId, onBack }) => {
//   const [classroom, setClassroom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [deleteSuccessful, setDeleteSuccessful] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assignLoading, setAssignLoading] = useState(false);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   useEffect(() => {
//     const fetchClassroom = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           `https://chizzykids-server.onrender.com/api/classroom/${ClassroomId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) throw new Error(`Error fetching classroom: ${response.status}`);
//         const data = await response.json();
//         setClassroom(data.classroom);
//       } catch (err) {
//         console.error("Error fetching classroom:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClassroom();
//   }, [ClassroomId]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           `https://chizzykids-server.onrender.com/api/subjects`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) throw new Error(`Error fetching subjects: ${response.status}`);

//         const data = await response.json();

//         setSubjects(data.subjects || data);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//       }
//     };

//     fetchSubjects();
//   }, []);

//   const handleAssign = async () => {
//     setAssignLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:8080/api/assign-subjects-classroom`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             classId: ClassroomId,
//             subjectIds: selectedSubjects,
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.error("Error")
//       };
//       setModalMessage("Subjects assigned successfully.");
//       setShowAssignModal(false);
//     } catch (err) {
//       console.error("Error assigning subjects:", err);
//       setModalMessage("Failed to assign subjects. Please try again later.");
//     } finally {
//       setAssignLoading(false);
//     }
//   };

//   const handleSubjectSelection = (subjectId) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subjectId)
//         ? prev.filter((id) => id !== subjectId)
//         : [...prev, subjectId]
//     );
//   };

//   const handleDeleteStudent = async () => {
//     setDeleteLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:8080/api/delete-classroom/${ClassroomId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         setModalMessage("Classroom deleted successfully.");
//         setDeleteSuccessful(true);
//       } else {
//         const errorData = await response.json();
//         setModalMessage(`Error: ${errorData.message}`);
//       }
//     } catch (err) {
//       console.error("Error deleting classroom:", err);
//       setModalMessage("Failed to delete classroom. Please try again later.");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Spinner
//         animation="border"
//         variant="primary"
//         className="d-block mx-auto mt-3"
//       />
//     );
//   }

//   if (!classroom) {
//     return <p>Classroom not found</p>;
//   }

//   return (
//     <div className="p-4 shadow-lg">
//       <Button variant="outline-primary" onClick={onBack} className="mb-3">
//         Back
//       </Button>
//       <h3 className="text-center text-primary mb-4">Classroom Details</h3>
//       <div>
//         <p>
//           <strong>Classname:</strong> {classroom.className}
//         </p>
//         <p>
//           <strong>Teacher:</strong>{" "}
//           {classroom.teacher ? classroom.teacher.fullname : "N/A"}
//         </p>
//         <h4 className="mt-4">Students:</h4>
//         {classroom.students && classroom.students.length > 0 ? (
//           <ul>
//             {classroom.students.map((student) => (
//               <li key={student._id}>{student.fullname}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No students enrolled in this class.</p>
//         )}
//         <h4 className="mt-4">Subjects:</h4>
//         {classroom.subjects && classroom.subjects.length > 0 ? (
//           <ul>
//             {classroom.subjects.map((subject) => (
//               <li key={subject._id}>{subject.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No subjects assigned to this class.</p>
//         )}
//       </div>

//       <div className="d-flex justify-content-between">
//         <Button
//           variant="outline-primary"
//           onClick={() => setShowAssignModal(true)}
//         >
//           Assign Subject(s)
//         </Button>
//         <Button
//           variant="outline-danger"
//           onClick={() => setShowDeleteModal(true)}
//         >
//           Delete Classroom
//         </Button>
//       </div>

//       {/* Assign Subject Modal */}
//       <Modal
//         show={showAssignModal}
//         onHide={() => setShowAssignModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Subject(s) to Classroom</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {subjects.length > 0 ? (
//             <Form>
//               {subjects.map((subject) => (
//                 <Form.Check
//                   key={subject._id}
//                   type="checkbox"
//                   id={subject._id}
//                   label={subject.name}
//                   onChange={() => handleSubjectSelection(subject._id)}
//                 />
//               ))}
//             </Form>
//           ) : (
//             <Spinner
//               animation="border"
//               variant="primary"
//               className="d-block mx-auto"
//             />
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleAssign}
//             disabled={assignLoading}
//           >
//             {assignLoading ? (
//               <Spinner animation="border" size="sm" />
//             ) : (
//               "Assign"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Classroom Modal */}
//       <Modal
//         show={showDeleteModal}
//         onHide={() => setShowDeleteModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {deleteSuccessful ? <BsCheckCircleFill /> : "Delete Classroom"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             {modalMessage ||
//               "Are you sure you want to delete this classroom and all its data? This action cannot be undone."}
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           {!deleteSuccessful ? (
//             <>
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 No
//               </Button>
//               <Button
//                 variant="danger"
//                 onClick={handleDeleteStudent}
//                 disabled={deleteLoading}
//               >
//                 {deleteLoading ? (
//                   <>
//                     <Spinner
//                       as="span"
//                       animation="border"
//                       size="sm"
//                       role="status"
//                       aria-hidden="true"
//                     />{" "}
//                     Deleting...
//                   </>
//                 ) : (
//                   "Yes, Delete"
//                 )}
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="primary"
//               onClick={() => {
//                 setShowDeleteModal(false);
//                 onBack();
//               }}
//             >
//               Close
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ClassroomDetails;

import { useState, useEffect } from "react";
import { Button, Col, Spinner, Modal, Form, Toast } from "react-bootstrap";
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

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/classroom/${ClassroomId}`,
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
          `https://chizzykids-server.onrender.com/api/subjects`,
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

  const handleAssign = async () => {
    setAssignLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/assign-subjects-classroom`,
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

  const handleSubjectSelection = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleDeleteStudent = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/delete-classroom/${ClassroomId}`,
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
        Back
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

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-primary"
          onClick={() => setShowAssignModal(true)}
        >
          Assign Subject(s)
        </Button>
        {/*Button for removing assigned subject */}
        <Button
          variant="outline-primary"
          onClick={() => setShowRemoveAssign(true)}
        >
          Remove Assigned Subject(s)
        </Button>

        <Button
          variant="outline-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Classroom
        </Button>
      </div>

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
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
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
          {classroom.subjects && classroom.subjects.length > 0? (
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
                onClick={handleDeleteStudent}
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
