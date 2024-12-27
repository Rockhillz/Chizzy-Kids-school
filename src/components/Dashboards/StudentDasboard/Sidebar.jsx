import React from "react";
import { Nav } from "react-bootstrap";
import { FaUser, FaBook, FaCalendarAlt, FaChartBar, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css"; // Import custom CSS for additional styles

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { label: "Profile", icon: <FaUser />, tab: "profile" },
    { label: "Subjects", icon: <FaBook />, tab: "Subjects" },
    { label: "Grades", icon: <FaChartBar />, tab: "grades" },
    { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule" },
    { label: "Messages", icon: <FaEnvelope />, tab: "messages" },
    { label: "Settings", icon: <FaCog />, tab: "settings" },
    { label: "Logout", icon: <FaSignOutAlt />, tab: "logout" },
  ];

  return (
    <Nav
      className="sidebar d-flex flex-column flex-sm-row flex-md-column bg-light shadow-sm p-3"
    >
      {navItems.map((item) => (
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
