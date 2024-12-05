import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";

const StudentSubject = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://your-api.com/student/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses);
        } else {
          console.error(data.message || "Failed to fetch courses.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Spinner animation="grow" role="status"><span>Loading courses...</span></Spinner>;
  }

  if (!courses.length) {
    return <p>No courses available.</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Instructor</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.code}>
            <td>{course.code}</td>
            <td>{course.name}</td>
            <td>{course.instructor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentSubject;
