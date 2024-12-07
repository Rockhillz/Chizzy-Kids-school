import React from "react";
import { Badge } from "react-bootstrap";
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
    <div className="siz">
      <div>
        {/* Header Section */}
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
              <strong>Employee ID:</strong> {profile.employeeID}
            </p>
            <p>
              <strong>Role:</strong> <Badge bg="info">{profile.role}</Badge>
            </p>
            <p>
              <strong>Gender:</strong> {profile.gender}
            </p>
            <p>
              <strong>Address:</strong> {profile.address || "Not available"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(profile.dateOfBirth).toLocaleDateString() || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong>Department:</strong> {profile.department || "Not assigned"}
            </p>
            <p>
              <strong>Year Enrolled:</strong> {profile.yearEnrolled || "N/A"}
            </p>
            <p>
              <strong>Previous School:</strong>{" "}
              {profile.previous_school || "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Qualifications Section */}
      {profile.qualification && profile.qualification.length > 0 && (
        <div className="mt-4">
          <h5>Qualifications</h5>
          <ul>
            {profile.qualification.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Subjects Section */}
      {profile.subjects && profile.subjects.length > 0 && (
        <div className="mt-4">
          <h5>Subjects</h5>
          <ul>
            {profile.subjects.map((subject, index) => (
              <li key={index}>{subject.name || subject}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Section */}
      <div className="text-muted mt-4">
        <p>
          <strong>Account Created On:</strong>{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated On:</strong>{" "}
          {new Date(profile.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
