import React, { useState } from "react";
import StudentsList from "./StudentsList";
import StudentProfile from "./StudentProfile";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null); // Tracks the selected teacher

  return (
    <div>
      {/* If no student is selected, show the list of teachers */}
      {!selectedStudent ? (
        <StudentsList setSelectedStudent={setSelectedStudent} />
      ) : (
        // When a student is selected, show their profile
        <StudentProfile
        studentId={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default Students;