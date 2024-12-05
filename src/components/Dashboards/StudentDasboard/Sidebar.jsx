import React from "react";
import { Nav } from "react-bootstrap";
import { FaUser, FaBook, FaCalendarAlt, FaChartBar, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { label: "Profile", icon: <FaUser />, tab: "profile" },
    { label: "Courses", icon: <FaBook />, tab: "courses" },
    { label: "Grades", icon: <FaChartBar />, tab: "grades" },
    { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule" },
    { label: "Messages", icon: <FaEnvelope />, tab: "messages" },
    { label: "Settings", icon: <FaCog />, tab: "settings" },
    {label: "Logout", icon: <FaSignOutAlt />, tab: "logout" },
  ];

  return (
    <Nav className="flex-column bg-light shadow-sm p-3" style={{ minHeight: "100vh" }}>
      {navItems.map((item) => (
        <Nav.Link
          key={item.tab}
          onClick={() => setActiveTab(item.tab)}
          className={activeTab === item.tab ? "bg-primary text-white rounded" : "text-dark"}
          style={{ marginBottom: "10px", padding: "10px" }}
        >
          {item.icon} {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
