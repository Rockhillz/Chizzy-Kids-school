import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";

const SubjectDetails = ({ subjectId, onBack }) => {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/single-subject/${subjectId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching subject: ${response.status}`);
        }

        const data = await response.json();
        setSubject(data.subject);
      } catch (err) {
        console.error("Error fetching subject:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  if (loading) return <p>Loading subject details...</p>;
  if (!subject) return <p>Subject not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Back to Subjects List
      </Button>
      <h3 className="text-center text-primary mb-4">Subject Details</h3>
      <div className="align-items-center d-flex">
        <div>
          <p>
            <strong>Subject Name:</strong> {subject.name}
          </p>
          <p>
            <strong>Teacher:</strong>{" "}
            {subject.teacher ? subject.teacher.fullname : "N/A"}
          </p>
          <h4 className="mt-4">Students:</h4>
          {subject.students && subject.students.length > 0 ? (
            <ul>
              {subject.students.map((student) => (
                <li key={student._id}>{student.fullname}</li>
              ))}
            </ul>
          ) : (
            <p>No students taking this subject.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
