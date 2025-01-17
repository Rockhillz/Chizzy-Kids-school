import React, { useState, useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

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
       
        setSubject(data);
      } catch (err) {
        console.error("Error fetching subject:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  if (!subject) return <p>Subject not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Back
      </Button>
      <h3 className="text-center text-primary mb-4">Subject Details</h3>
      <div>
        <div>
        <p>
          <strong>Subject: </strong> {subject.name}
        </p>
        </div>
        <p>
          <strong>Teacher:</strong> {subject.teacher ? subject.teacher.fullname : "N/A"}
        </p>
        <h4 className="mt-4">Students</h4>
        {subject.students && subject.students.length > 0 ? (
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                
                <th>Students</th>
                <th>Student ID</th>
              </tr>
            </thead>
            <tbody>
              {subject.students.map((student, index) => (
                <tr key={student._id}>
                 
                  <td>{student.fullname}</td>
                  <td>{student.studentID}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No students taking this subject.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectDetails;
