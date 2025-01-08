// import React, { useState, useEffect } from 'react';

// const TeachClassroom = ({ teacherId }) => {
//   const [classroom, setClassroom] = useState(null);
//   const [attendance, setAttendance] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchClassroom = async () => {
//       try {
//         const response = await fetch(`/api/classrooms-assigned-to-teacher/${teacherId}`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });

//         const data = await response.json();

//         if (data.success) {
//           setClassroom(data.data);

//           // Initialize attendance state
//           const initialAttendance = {};
//           data.data.students.forEach((student) => {
//             initialAttendance[student.id] = 'Absent'; // Default to 'Absent'
//           });
//           setAttendance(initialAttendance);
//         } else {
//           setError(data.message || 'Failed to fetch classroom data.');
//         }
//       } catch (error) {
//         console.error('Error fetching classroom:', error);
//         setError('An error occurred while fetching classroom data.');
//       }
//     };

//     fetchClassroom();
//   }, [teacherId]);

//   const handleAttendanceChange = (studentId, status) => {
//     setAttendance({ ...attendance, [studentId]: status });
//   };

//   const submitAttendance = async () => {
//     try {
//       const response = await fetch('/api/attendance', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ classroomId: classroom.id, attendance }),
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert('Attendance submitted successfully!');
//       } else {
//         alert(result.message || 'Failed to submit attendance.');
//       }
//     } catch (error) {
//       console.error('Error submitting attendance:', error);
//       alert('An unexpected error occurred.');
//     }
//   };

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   if (!classroom) {
//     return <div>Loading classroom data...</div>;
//   }

//   return (
//     <div className="teach-classroom">
//       <div className="classroom-info">
//         <h2>{classroom.classroomName}</h2>
//         <p>Teacher: {classroom.teacherName}</p>
//         <p>Number of Students: {classroom.studentCount}</p>
//       </div>
//       <div className="attendance-list">
//         <h3>Student Attendance</h3>
//         <ul>
//           {classroom.students.map((student) => (
//             <li key={student.id}>
//               {student.name}
//               <select
//                 value={attendance[student.id]}
//                 onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
//               >
//                 <option value="Absent">Absent</option>
//                 <option value="Present">Present</option>
//               </select>
//             </li>
//           ))}
//         </ul>
//         <button onClick={submitAttendance}>Submit Attendance</button>
//       </div>
//     </div>
//   );
// };

// export default TeachClassroom;

import React, { useState, useEffect } from 'react';
import { Spinner } from "react-bootstrap";

const TeachClassroom = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState('');

  // Extract teacherId from the decoded JWT token stored in localStorage
  const getTeacherIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      return decodedToken.teacherId;
    }
    return null;
  };

  const teacherId = getTeacherIdFromToken();

  useEffect(() => {
    if (!teacherId) {
      setError("Teacher ID is missing or invalid.");
      return;
    }

    const fetchClassroom = async () => {
      try {
        const response = await fetch(`https://chizzykids-server.onrender.com/api/classrooms-assigned-to-teacher`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setClassroom(data.data);
          setLoading(false); // Set loading state to false when data is fetched successfully

          // Initialize attendance state
          const initialAttendance = {};
          data.data.students.forEach((student) => {
            initialAttendance[student.id] = 'Absent'; // Default to 'Absent'
          });
          setAttendance(initialAttendance);
        } else {
          setError(data.message || 'Failed to fetch classroom data.');
        }
      } catch (error) {
        console.error('Error fetching classroom:', error);
        setError('An error occurred while fetching classroom data.');
      }
    };

    fetchClassroom();
  }, [teacherId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const submitAttendance = async () => {
    try {
      const response = await fetch('https://chizzykids-server.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classroomId: classroom.id, attendance }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Attendance submitted successfully!');
      } else {
        alert(result.message || 'Failed to submit attendance.');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('An unexpected error occurred.');
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  } 

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-5"
        style={{ width: '3rem', height: '3rem' }}
      />
    );
  }

  return (
    <div className="container py-1">
      <div className="classroom-info mb-2 p-3 border rounded bg-light">
        <h2 className="text-primary"><strong>{classroom.classroom}</strong></h2>
        <h5>Teacher: <strong>{classroom.teacher}</strong></h5>
        <h5>Number of Students: <strong>{classroom.studentCount}</strong></h5>
      </div>
      
      <div className="attendance-list">
        <h2 className="mb-2">Student Attendance</h2>
        <ul className="list-group">
          {classroom.students.map((student) => (
            <li
              key={student.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.1rem" }}
            >
              {student.name}
              <select
                className="form-select w-25"
                value={attendance[student.id]}
                onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
              >
                <option value="Absent">Absent</option>
                <option value="Present">Present</option>
              </select>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary my-2" onClick={submitAttendance}>
          Submit Attendance
        </button>
      </div>
    </div>
  ); 
};

export default TeachClassroom;

