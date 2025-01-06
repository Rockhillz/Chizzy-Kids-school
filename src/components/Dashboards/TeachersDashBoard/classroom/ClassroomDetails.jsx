import { useState, useEffect } from "react";
import { Button, Col, Spinner } from "react-bootstrap";

const ClassroomDetails = ({ ClassroomId, onBack }) => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);

  if (ClassroomId) {
    console.log("Fetching details for ClassroomId:", ClassroomId);
  }

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const token = localStorage.getItem("token"); // Authentication token
        const response = await fetch(
          `https://chizzykids-server.onrender.com/api/classroom/${ClassroomId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if required
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching classroom: ${response.status}`);
        }

        const data = await response.json();

        setClassroom(data.classroom);
      } catch (err) {
        console.error("Error fetching classroom:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  if (!classroom) return <p>Classroom not found</p>;

  return (
    <div className="p-4 shadow-lg">
      <Button variant="outline-primary" onClick={onBack} className="mb-3">
        Back to Classroom List
      </Button>
      <h3 className="text-center text-primary mb-4">Classroom Details</h3>
      <div className="align-items-center d-flex">
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
      </div>
    </div>
  );
};

export default ClassroomDetails;
