import { useState, useEffect } from "react";

const AssignClass = ({ teacherId, onClose, setAssignLoading }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [message, setMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  // Fetch classrooms on component mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token

        const response = await fetch(`http://localhost:8080/api/classrooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classrooms.");
          
        }

        const data = await response.json();
        console.log(data)
        setClassrooms(data.classrooms || []);
        
      } catch (error) {
        console.error("Error fetching classrooms:", error);
        setMessage("Error fetching classrooms. Please try again.");
      }
    };

    fetchClassrooms();
  }, []);

  // Assign teacher to classroom
  const handleAssign = async () => {
    if (!selectedClassroom) {
      setMessage("Please select a classroom.");
      return;
    }

    setLocalLoading(true); // Start spinner
    setAssignLoading(true); // Notify parent to show spinner
    try {
      const token = localStorage.getItem("token");
      console.log(`token: ${token}`);

      const response = await fetch(`http://localhost:8080/api/assign-Teacher`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teacherId,
          classroomId: selectedClassroom,
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
      {/* <h5>Assign Teacher to Classroom</h5> */}
      <select
        value={selectedClassroom}
        onChange={(e) => setSelectedClassroom(e.target.value)}
        className="form-select mt-3"
      >
        <option value="">Select Classroom</option>
        {classrooms.map((classroom) => (
          <option key={classroom._id} value={classroom._id}>
            {classroom.className}
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

export default AssignClass;
