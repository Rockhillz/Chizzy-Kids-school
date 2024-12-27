import React, { useState } from "react";
import TeachersList from "./TeachersList";
import TeacherProfile from "./TeacherProfile";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Tracks the selected teacher

  return (
    <div>
      {/* If no teacher is selected, show the list of teachers */}
      {!selectedTeacher ? (
        <TeachersList setSelectedTeacher={setSelectedTeacher} />
      ) : (
        // When a teacher is selected, show their profile
        <TeacherProfile 
          teacherId={selectedTeacher} 
          onBack={() => setSelectedTeacher(null)} 
        />
      )}
    </div>
  );
};

export default Teachers;