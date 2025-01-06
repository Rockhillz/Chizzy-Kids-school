import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClassroomsList = ({ setSelectedClassroom }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const response = await fetch(`https://chizzykids-server.onrender.com/api/classrooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClassrooms(data.classrooms || []);
      } catch (err) {
        console.error("Error fetching classrooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const handleClassroomClick = (classroomId) => {
    setSelectedClassroom(classroomId);
  };

  const addClassroom = () => {
    navigate("/add-teacher");
  };

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;

  return (
    <div className="table-responsive">
      <div style={{ width: "900px" }} className="mb-3">
        <div className="d-flex justify-content-between">
          <h3 className="">Classrooms List</h3>
          <Button className="bg-t" onClick={addClassroom}>
            Add Classroom
          </Button>
        </div>
      </div>

      <Table bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>S/no</th>
            <th>Classroom</th>
            <th>Number of Students</th>
            <th>Number of Subjects</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom, index) => (
            <tr
              key={classroom._id}
              className="h-100 shadow-sm"
              onClick={() => handleClassroomClick(classroom._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{classroom.className}</td>
              <td>{classroom.studentsCount || classroom.students?.length || 0}</td>
              <td>{classroom.subjectsCount || classroom.subjects?.length || 0}</td>
              <td>{classroom.teacher?.fullname || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClassroomsList;
