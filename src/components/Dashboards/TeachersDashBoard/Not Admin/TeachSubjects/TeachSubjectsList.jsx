import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { Table } from 'react-bootstrap'; // Import Table from react-bootstrap

const TeachSubjectsList = ({ onSubjectSelect }) => {
    const [subjects, setSubjects] = useState([]);
    
    console.log("onSubjectSelect prop:", onSubjectSelect);
  
    useEffect(() => {
      const fetchSubjects = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8080/api/subjects-assigned-to-teacher', {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch subjects');
          }
  
          const data = await response.json();
          setSubjects(data.subjects);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
  
      fetchSubjects();
    }, []);
  
    return (
      <div>
        <h1>Subjects</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr
                  key={subject._id}
                  onClick={() => onSubjectSelect(subject._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{subject.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No subjects assigned.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  };
  

export default TeachSubjectsList;
