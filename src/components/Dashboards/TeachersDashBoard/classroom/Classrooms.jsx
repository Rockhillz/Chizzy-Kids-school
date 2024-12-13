import React, { useState } from "react";
import ClassroomDetails from "./ClassroomDetails";
import ClassroomsList from "./ClassroomsList";

const Classrooms = () => {
  const [selectedClassroom, setSelectedClassroom] = useState(null); // Tracks the selected teacher

  return (
    <div>
      {/* If no classroom is selected, show the list of classrooms */}
      {!selectedClassroom ? (
        <ClassroomsList setSelectedClassroom={setSelectedClassroom} />
      ) : (
        // When a student is selected, show their profile
        <ClassroomDetails
          ClassroomId={selectedClassroom} // Pass the correct ClassroomId here
          onBack={() => setSelectedClassroom(null)}
        />
      )}
    </div>
  );
};

export default Classrooms;
