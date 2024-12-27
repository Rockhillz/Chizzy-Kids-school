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
import "./TeachClassroom.css";

const TeachClassroom = () => {
  const [classroom, setClassroom] = useState(null);
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
        const response = await fetch(`http://localhost:8080/api/classrooms-assigned-to-teacher`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setClassroom(data.data);

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
      const response = await fetch('/api/attendance', {
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
    return <div className="error">{error}</div>;
  } 

  if (!classroom) {
    return <div>Loading classroom data...</div>;
  }

  return (
    <div className="teach-classroom">
      <div className="classroom-info">
        <h2><strong>{classroom.classroom}</strong></h2>
        
        <h5>Teacher: <strong>{classroom.teacher}</strong></h5>
        <h5>Number of Students: <strong>{classroom.studentCount}</strong></h5>
      </div>
      <div className="attendance-list">
        <h2>Student Attendance</h2>
        <ul>
          {classroom.students.map((student) => (
            <li key={student.id}>
              {student.name}
              <select
                value={attendance[student.id]}
                onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
              >
                <option value="Absent">Absent</option>
                <option value="Present">Present</option>
              </select>
            </li>
          ))}
        </ul>
        <button onClick={submitAttendance}>Submit Attendance</button>
      </div>
    </div>
  );
};

export default TeachClassroom;
