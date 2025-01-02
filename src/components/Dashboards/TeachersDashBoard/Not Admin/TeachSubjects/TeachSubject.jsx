import React, { useState } from "react";
import TeachSubjectsList from "./TeachSubjectsList";
import TeachSubjectDetails from "./TeachSubjectDetails";

const TeachSubject = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelection = (subjectId) => {
    setSelectedSubject(subjectId);
  };
  

  const handleBackToSubjectList = () => {
    setSelectedSubject(null);
  };

  return (
    <div>
      {!selectedSubject ? (
        <TeachSubjectsList onSubjectSelect={handleSubjectSelection} />

      ) : (
        <TeachSubjectDetails
          subjectId={selectedSubject}  
          onBack={handleBackToSubjectList}
        />
      )}
    </div>
  );
};

export default TeachSubject;
