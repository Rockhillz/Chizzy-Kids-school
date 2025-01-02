import React, { useState, useEffect } from "react";

const TeachSubjectDetails = ({ subjectId, onBack }) => { // Receive subjectId as a prop
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/students-by-subject/${subjectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        console.log("Fetched students:", data);
        setStudents(data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [subjectId]);

  const handleMarkChange = (studentId, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.studentId._id === studentId
          ? { ...student, [field]: Math.min(field === "exam" ? 60 : 20, value) }
          : student
      )
    );
  };

  const handleSaveMarks = async (studentId) => {
    const student = students.find((s) => s.studentId._id === studentId);
    try {
      const response = await fetch("/api/marks/update", {
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save marks");
      }

      alert("Marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Failed to save marks.");
    }
  };

  const handleFinalizeMarks = async (studentId) => {
    try {
      const response = await fetch("/api/marks/finalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentId,
          subject: subjectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to finalize marks");
      }

      alert("Marks finalized successfully!");
    } catch (error) {
      console.error("Error finalizing marks:", error);
      alert("Failed to finalize marks.");
    }
  };

  return (
    <div>
      <h1>Subject Details</h1>
      <button onClick={onBack}>Back to Subjects</button> {/* Back button */}
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>First Assessment (20)</th>
            <th>Second Assessment (20)</th>
            <th>Exam (60)</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId._id}>
              <td>{student.studentId.name}</td>
              <td>
                <input
                  type="number"
                  max="20"
                  min="0"
                  value={student.firstAssessment || ""}
                  onChange={(e) =>
                    handleMarkChange(
                      student.studentId._id,
                      "firstAssessment",
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  max="20"
                  min="0"
                  value={student.secondAssessment || ""}
                  onChange={(e) =>
                    handleMarkChange(
                      student.studentId._id,
                      "secondAssessment",
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  max="60"
                  min="0"
                  value={student.exam || ""}
                  onChange={(e) =>
                    handleMarkChange(
                      student.studentId._id,
                      "exam",
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                />
              </td>
              <td>{student.total || 0}</td>
              <td>
                <button onClick={() => handleSaveMarks(student.studentId._id)}>
                  Save
                </button>
                <button
                  onClick={() => handleFinalizeMarks(student.studentId._id)}
                  disabled={student.finalized}
                >
                  Finalize
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachSubjectDetails;
