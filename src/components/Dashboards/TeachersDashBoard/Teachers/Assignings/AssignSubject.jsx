import { useState, useEffect } from "react";

const AssignSubject = ({ teacherId, onClose, setAssignLoading }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [message, setMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  // Fetch classrooms on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token

        const response = await fetch(`https://chizzykids-server.onrender.com/api/subjects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Subjects.");
          
        }

        const data = await response.json();
        setSubjects(data || []);
        
        
        
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setMessage("Error fetching subjects. Please try again.");
      }
    };

    fetchSubjects();
  }, []);

  // Assign teacher to classroom
  const handleAssign = async () => {
    if (!selectedSubjects) {
      setMessage("Please select a subject.");
      return;
    }

    setLocalLoading(true); // Start spinner
    setAssignLoading(true); // Notify parent to show spinner
    try {
      const token = localStorage.getItem("token");
      console.log(`token: ${token}`);

      const response = await fetch(`https://chizzykids-server.onrender.com/api/assign/Teacher-To-Subject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teacherId,
          subjectId: selectedSubjects,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Teacher assigned successfully!");
        setTimeout(() => {
          onClose(); // Close modal on success
        }, 1500); // Delay to show success message
      } else {
        setMessage(data.message || "Failed to assign teacher.");
      }
    } catch (error) {
      console.error("Error assigning teacher:", error);
      setMessage("Error assigning teacher. Please try again.");
    } finally {
      setLocalLoading(false); // Stop spinner
      setAssignLoading(false); // Notify parent to stop spinner
    }
  };

  return (
    <div>
      {/* <h5>Assign Teacher to Subject</h5> */}
      <select
        value={selectedSubjects}
        onChange={(e) => setSelectedSubjects(e.target.value)}
        className="form-select mt-3"
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAssign}
        disabled={localLoading} // Disable while loading
        className="btn btn-primary mt-3"
      >
        {localLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Assign"
        )}
      </button>
      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
};

export default AssignSubject;
