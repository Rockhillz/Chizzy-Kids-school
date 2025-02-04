import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { Table, Spinner } from 'react-bootstrap'; 

const TeachSubjectsList = ({ onSubjectSelect }) => {
    const [subjects, setSubjects] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
  
    useEffect(() => {
      const fetchSubjects = async () => {

        const getTeacherIdFromToken = () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const decodedToken = JSON.parse(atob(token.split(".")[1])); 
            return decodedToken.teacherId || null;
          } catch (error) {
            console.error("Error decoding token:", error);
            return null;
          }
        };
  
        const teacherId = getTeacherIdFromToken();

        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subjects-assigned-to-teacher/${teacherId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch subjects');
          }
  
          const data = await response.json();
          setSubjects(data.subjects);
          
        } catch (error) {
          console.error('Error fetching subjects:', error);
        } finally {
          setLoading(false);
        }

      };
  
      fetchSubjects();
    }, []);

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
                 <Spinner animation="border" variant="primary" className="" />;
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  };
  

export default TeachSubjectsList;
