import React, { useState } from "react";
import SubjectsList from "./SubjectsList";
import SubjectDetails from "./SubjectDetails";

const Subjects = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div>
      {!selectedSubject ? (
        <SubjectsList setSelectedSubject={setSelectedSubject} />
      ) : (
        <SubjectDetails
          subjectId={selectedSubject}
          onBack={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
};

export default Subjects;
