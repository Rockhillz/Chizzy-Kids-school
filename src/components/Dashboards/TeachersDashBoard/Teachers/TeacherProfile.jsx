import { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
const TeacherProfile = ({ teacherId, onBack }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/singleTeacher/${teacherId}`
        );
        const data = await response.json();
        setTeacher(data.teacher);
        console.log("Fetching teacher with ID:", teacherId);
        console.log("API Response:", data);
      } catch (err) {
        console.error("Error fetching teacher profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  if (loading) return <p>Loading teacher profile...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button
        variant="outline-primary"
        onClick={onBack}
        className="mb-3"
      >
        Back to Teachers List
      </Button>
      <h3 className="text-center text-primary mb-4">Teacher Profile</h3>
      <div className="align-items-center d-flex">
        <Col md={4} className="text-center">
          <img
            src={teacher.image || "https://via.placeholder.com/250"}
            alt="Profile"
            className="img-fluid rounded-circle shadow"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Col>
        <div md={8}>
          <p>
            <strong>Full Name:</strong> {teacher.fullname}
          </p>
          <p>
            <strong>Employee ID:</strong> {teacher.employeeID}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.phone}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address || "Not available"}
          </p>
          <p>
            <strong>Date of Birth:</strong> { new Date(teacher.dateOfBirth).toLocaleDateString() }
          </p>
          <p>
            <strong>Department:</strong> {teacher.department || "N/A"}
          </p>
          <p>
            <strong>Classroom:</strong>{" "}
            {teacher.classroom ? teacher.classroom.name : "Not assigned"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
