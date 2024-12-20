import { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const StudentProfile = ({ studentId, onBack }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/single-student/${studentId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if required
            },
          }
        );
        const data = await response.json();
        setStudent(data.student);
      } catch (err) {
        console.error("Error fetching Student profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  
  

  if (loading) return <p>Loading student profile...</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" className="mb-3">
        Back to Student List
      </Button>
      
      <h3 className="text-center text-primary mb-4">Student Profile</h3>
      <div className="align-items-center d-flex">
        <Col md={4} className="text-center">
          <img
            src={student.image || "https://via.placeholder.com/250"}
            alt="Profile"
            className="img-fluid rounded-circle shadow"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Col>
        <div md={8}>
          <p>
            <strong>Full Name:</strong> {student.fullname}
          </p>
          <p>
            <strong>Student ID:</strong> {student.studentID}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Address:</strong> {student.address || "Not available"}
          </p>
          <p>
            <strong>Date of Birth:</strong> { new Date(student.dateOfBirth).toLocaleDateString() }
          </p>
          <p>
            <strong>Department:</strong> {student.department || "N/A"}
          </p>
          <p>
            <strong>Classroom:</strong>{" "}
            {student.classroom ? student.classroom.className : "Not assigned"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
