import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Classrooms from "../classroom/Classrooms";
import Subjects from "../Subject/Subjects";
import Students from "../Students/Students";
import Teachers from "../Teachers/Teachers";
import "./Admin.css"
import TermAndSession from "../Term & Session/TermAndSession";
import PromoteAndGrad from "../PromoteStudents/PromoteAndGrad";
import Events from "../Events and News/eventss/Events";
import News from "../Events and News/News/News";

const Admin = () => {
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(true);

  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case "classrooms":
        return <Classrooms />;
      case "subjects":
        return <Subjects />;
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "terms":
        return <TermAndSession />;
        case "promote/graduate":
          return <PromoteAndGrad />;
        case "events":
          return <Events />;
        case "news":
          return <News />;
      default:
        return <p>Welcome to the Admin Dashboard. Select an option to proceed.</p>;
    }
  };

  const handleBack = () => {
    setActiveAdminTab("dashboard");
    setShowSidebar(true);
  };

  const adminButtons = [
    { id: "classrooms", label: "Classrooms" },
    { id: "subjects", label: "Subjects" },
    { id: "students", label: "Students" },
    { id: "teachers", label: "Teachers" },
    { id: "terms", label: "Term and Session" },
    { id: "promote/graduate", label: "Promote and Graduate" },
    { id: "events", label: "Events" },
    { id: "news", label: "News" }

    // Add more buttons here as needed
  ];

  return (
    <Container fluid>
      {/* Header with Back Button */}
      <Row className="py-3 bg-light border-bottom mb-2">

        

        <Col>
          {activeAdminTab !== "dashboard" && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
        </Col>
      </Row>

      {/* Main Content */}
      <Col xs={12} md={showSidebar ? 10 : 12}>
          {renderAdminContent()}
        </Col>

      <Row>
        {/* Sidebar */}
        {showSidebar && (
          <Col xs={12} className="admin-buttons">
            <div className="d-flex flex-column flex-md-row flex-wrap gap-3">
              {adminButtons.map((button) => (
                <Button
                  key={button.id}
                  variant={activeAdminTab === button.id ? "primary" : "outline-primary"}
                  className="admin-button"
                  onClick={() => {
                    setActiveAdminTab(button.id);
                    setShowSidebar(false);
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </Col>
        )}

        
      </Row>
    </Container>
  );
};

export default Admin;
