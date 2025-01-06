// import React, { useState, useEffect } from "react";

// const TeachSubjectDetails = ({ subjectId, onBack }) => { // Receive subjectId as a prop
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/students-by-subject/${subjectId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch students");
//         }
//         const data = await response.json();
//         console.log("Fetched students:", data);
//         setStudents(data.students);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, [subjectId]);

//   const handleMarkChange = (studentId, field, value) => {
//     setStudents((prevStudents) =>
//       prevStudents.map((student) =>
//         student.studentId._id === studentId
//           ? { ...student, [field]: Math.min(field === "exam" ? 60 : 20, value) }
//           : student
//       )
//     );
//   };

//   const handleSaveMarks = async (studentId) => {
//     const student = students.find((s) => s.studentId._id === studentId);
//     try {
//       const response = await fetch("/api/marks/update", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           student: studentId,
//           subject: subjectId,
//           firstAssessment: student.firstAssessment,
//           secondAssessment: student.secondAssessment,
//           exam: student.exam,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save marks");
//       }

//       alert("Marks saved successfully!");
//     } catch (error) {
//       console.error("Error saving marks:", error);
//       alert("Failed to save marks.");
//     }
//   };

//   const handleFinalizeMarks = async (studentId) => {
//     try {
//       const response = await fetch("/api/marks/finalize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           student: studentId,
//           subject: subjectId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to finalize marks");
//       }

//       alert("Marks finalized successfully!");
//     } catch (error) {
//       console.error("Error finalizing marks:", error);
//       alert("Failed to finalize marks.");
//     }
//   };

//   return (
//     <div>
//       <h1>Subject Details</h1>
//       <button onClick={onBack}>Back to Subjects</button> {/* Back button */}
//       <table>
//         <thead>
//           <tr>
//             <th>Student</th>
//             <th>First Assessment (20)</th>
//             <th>Second Assessment (20)</th>
//             <th>Exam (60)</th>
//             <th>Total</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.studentId._id}>
//               <td>{student.studentId.name}</td>
//               <td>
//                 <input
//                   type="number"
//                   max="20"
//                   min="0"
//                   value={student.firstAssessment || ""}
//                   onChange={(e) =>
//                     handleMarkChange(
//                       student.studentId._id,
//                       "firstAssessment",
//                       parseInt(e.target.value, 10) || 0
//                     )
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   max="20"
//                   min="0"
//                   value={student.secondAssessment || ""}
//                   onChange={(e) =>
//                     handleMarkChange(
//                       student.studentId._id,
//                       "secondAssessment",
//                       parseInt(e.target.value, 10) || 0
//                     )
//                   }
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   max="60"
//                   min="0"
//                   value={student.exam || ""}
//                   onChange={(e) =>
//                     handleMarkChange(
//                       student.studentId._id,
//                       "exam",
//                       parseInt(e.target.value, 10) || 0
//                     )
//                   }
//                 />
//               </td>
//               <td>{student.total || 0}</td>
//               <td>
//                 <button onClick={() => handleSaveMarks(student.studentId._id)}>
//                   Save
//                 </button>
//                 <button
//                   onClick={() => handleFinalizeMarks(student.studentId._id)}
//                   disabled={student.finalized}
//                 >
//                   Finalize
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeachSubjectDetails;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const TeachSubjectDetails = ({ subjectId, onBack }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/students-by-subject/${subjectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data.students || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to load students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [subjectId]);

  const handleMarkChange = (studentId, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, [field]: Math.min(field === "exam" ? 60 : 20, value) }
          : student
      )
    );
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 85) return "A"; // 85 - 100
    if (totalMarks >= 70) return "B"; // 70 - 84
    if (totalMarks >= 60) return "C"; // 60 - 69
    if (totalMarks >= 50) return "D"; // 50 - 59
    if (totalMarks >= 40) return "E"; // 40 - 49
    return "F"; // 0 - 39
  };

  // Save mark for students
  const handleSaveMarks = async (studentId) => {
    const student = students.find((s) => s.id === studentId);
    // const totalMarks = (student.firstAssessment || 0) + (student.secondAssessment || 0) + (student.exam || 0);
    // const grade = calculateGrade(totalMarks);  // Calculate grade

    try {
      const response = await fetch("http://localhost:8080/api/mark/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          subject: subjectId,
          firstAssessment: student.firstAssessment,
          secondAssessment: student.secondAssessment,
          exam: student.exam,
          // grade: grade,  // Send the calculated grade to the backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save marks");
      }

      // const updatedMark = await response.json();
      const data = await response.json();
      console.log(data);
      const updatedMark = data.mark;

      // Update the state with the saved marks
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === updatedMark.student
            ? {
                ...s,
                firstAssessment: updatedMark.firstAssessment,
                secondAssessment: updatedMark.secondAssessment,
                exam: updatedMark.exam,
              }
            : s
        )
      );

      alert("Marks saved successfully!");
    } catch (error) {
      alert("Failed to save marks.");
    }
  };

  // Finalize score for student
  const handleFinalizeMarks = async (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const totalMarks =
      (student.firstAssessment || 0) +
      (student.secondAssessment || 0) +
      (student.exam || 0);
    const grade = calculateGrade(totalMarks); // Calculate grade

    try {
      const response = await fetch("http://localhost:8080/api/mark/finalize", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          subject: subjectId,
          grade: grade, // Send the calculated grade when finalizing
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize marks");
      }

      alert("Marks finalized successfully!");
    } catch (error) {
      alert("Failed to finalize marks.");
    }
  };

  // Unfinalize score for student
  const handleUnfinalizeMarks = async (studentId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/mark/unfinalize",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: studentId,
            subject: subjectId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unfinalize marks");
      }

      alert("Marks unfinalized successfully!");
    } catch (error) {
      alert("Failed to unfinalize marks.");
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
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Enter Student Scores</h1>
      <Button variant="secondary" className="mb-3" onClick={onBack}>
        Back to Subjects
      </Button>
      {students.length === 0 ? (
        <Alert variant="info">No students enrolled in this subject.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student</th>
              <th>CA 1</th>
              <th>CA 2</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const totalMarks =
                (student.firstAssessment || 0) +
                (student.secondAssessment || 0) +
                (student.exam || 0);
              const grade = calculateGrade(totalMarks);

              return (
                <tr key={student.id}>
                  <td>{student.name || "No Name Provided"}</td>
                  <td>
                    <InputGroup>
                      <FormControl
                        // type="number"
                        // max="20"
                        // min="0"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.firstAssessment || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "firstAssessment",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.secondAssessment || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "secondAssessment",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={student.exam || ""}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            "exam",
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        style={{ width: "60px", height: "40px" }}
                      />
                    </InputGroup>
                  </td>
                  <td>{totalMarks}</td>
                  <td>{grade}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => handleSaveMarks(student.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleFinalizeMarks(student.id)}
                      disabled={student.finalized}
                    >
                      Finalize
                    </Button>
                    {student.finalized && (
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleUnfinalizeMarks(student.id)}
                      >
                        Unfinalize
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TeachSubjectDetails;
