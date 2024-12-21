import React from "react";
import { Nav } from "react-bootstrap";
import { FaUser, FaBook, FaCalendarAlt, FaChartBar, FaChalkboardTeacher, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css"; // Import custom CSS for additional styles

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const navItems = [
    { label: "Profile", icon: <FaUser />, tab: "profile", roles: ["teacher", "admin"] },
    { label: "Subjects", icon: <FaBook />, tab: "Subjects", roles: ["teacher", "admin"] },
    { label: "Classrooms", icon: <FaChalkboardTeacher/>, tab: "Classrooms", roles: ["teacher", "admin"]},
    { label: "Grades", icon: <FaChartBar />, tab: "grades", roles: ["teacher", "admin"]},
    { label: "Students", icon: <FaUser />, tab: "Students", roles: ["admin"] },
    {label: "Teachers", icon: <FaUser />, tab: "Teachers", roles: ["admin"] },
    { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule", roles: ["teacher", "admin"] },
    { label: "Messages", icon: <FaEnvelope />, tab: "messages", roles: ["teacher", "admin"] },
    { label: "Settings", icon: <FaCog />, tab: "settings", roles: ["teacher", "admin"] },
    { label: "Logout", icon: <FaSignOutAlt />, tab: "Logout", roles: ["teacher", "admin"] },
  ];

  return (
    <Nav
      className="sidebar d-flex flex-column flex-sm-row flex-md-column bg-light shadow-sm p-3"
    >
      {navItems.filter((item) => item.roles?.includes(role))
        .map((item) => (
        <Nav.Link
          key={item.tab}
          onClick={() => setActiveTab(item.tab)}
          className={`d-flex align-items-center justify-content-center ${
            activeTab === item.tab ? "bg-t text-white rounded" : "text-dark"
          }`}
          style={{
            marginBottom: "10px",
            padding: "10px",
            flex: "1",
          }}
        >
          <span className="icon">{item.icon}</span>
          {/* Only show labels on medium or larger screens */}
          <span className="label d-none d-md-inline">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;