// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// const Profile = ({ profile }) => {
//   if (!profile) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//     <Card>
//       <Card.Body>
//         <Row>
//           <Col md={4}>
//             <img
//               src={profile.image || "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="img-fluid img-responsive"
//             />
//           </Col>
//           <Col md={8}>
//             <h4>{profile.fullname}</h4>
//             <p>Email: {profile.email}</p>
//             <p>Student ID: {profile.studentID}</p>
//             <p>Address: {profile.address || "Not available"}</p>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Profile;

import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import "./Profile.css";

const Profile = ({ profile }) => {
  if (!profile) {
    return (
      <div className="text-center my-4">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className=" siz">
      <div>

        <div className="d-flex mt-3">
          <img
            src={profile.image}
            alt="Profile"
            className="img-fluid ms-3"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />

          <div className="ms-5">
            <h4 className="text-primary">{profile.fullname}</h4>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Student ID:</strong> {profile.studentID}
            </p>
            <p>
              <strong>Gender:</strong> <Badge bg="info">{profile.gender}</Badge>
            </p>
            <p>
              <strong>Address:</strong> {profile.address || "Not available"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(profile.dateOfBirth).toLocaleDateString() || "N/A"}
            </p>
            <p>
              <strong>Parent's Name:</strong> {profile.parents_name}
            </p>
            <p>
              <strong>Parent's Contact:</strong> {profile.parent_no}
            </p>
            <p>
              <strong>Year Enrolled:</strong> {profile.yearEnrolled || "N/A"}
            </p>
            <p>
              <strong>Classroom:</strong>{" "}
              {profile.classroom ? profile.classroom.name : "Not assigned"}
            </p>
          </div>
        </div>
      </div>

      

      {/* Subjects Section */}
      {profile.subjects && profile.subjects.length > 0 && (
        <div className="mt-4">
          <h5>Subjects</h5>
          <ul>
            {profile.subjects.map((subject, index) => (
              <li key={index}>{subject.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Grades Section */}
      {profile.grades && profile.grades.length > 0 && (
        <div className="mt-4">
          <h5>Grades</h5>
          <ul>
            {profile.grades.map((grade, index) => (
              <li key={index}>
                {grade.subject}: {grade.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
