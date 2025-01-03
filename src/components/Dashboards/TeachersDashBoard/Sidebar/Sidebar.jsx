// import React from "react";
// import { Nav } from "react-bootstrap";
// import { FaUser, FaBook, FaCalendarAlt, FaChartBar, FaChalkboardTeacher, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
// import "./Sidebar.css"; // Import custom CSS for additional styles

// const Sidebar = ({ activeTab, setActiveTab, role }) => {
//   const navItems = [
//     { label: "Profile", icon: <FaUser />, tab: "profile", roles: ["teacher", "admin"] },
//     { label: "Grades", icon: <FaChartBar />, tab: "grades", roles: ["teacher", "admin"]},
//     { label: "Subjects", icon: <FaBook />, tab: "Subjects", roles: ["teacher", "admin"] },
//     { label: "Classrooms", icon: <FaChalkboardTeacher/>, tab: "Classrooms", roles: ["teacher", "admin"]},
//     { label: "Students", icon: <FaUser />, tab: "Students", roles: ["admin"] },
//     {label: "Teachers", icon: <FaUser />, tab: "Teachers", roles: ["admin"] },
//     { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule", roles: ["teacher", "admin"] },
//     { label: "Messages", icon: <FaEnvelope />, tab: "messages", roles: ["teacher", "admin"] },
//     { label: "Settings", icon: <FaCog />, tab: "settings", roles: ["teacher", "admin"] },
//     { label: "Logout", icon: <FaSignOutAlt />, tab: "Logout", roles: ["teacher", "admin"] },
//   ];

//   return (
//     <Nav
//       className="sidebar d-flex flex-column flex-sm-row flex-md-column bg-light shadow-sm p-3"
//     >
//       {navItems.filter((item) => item.roles?.includes(role))
//         .map((item) => (
//         <Nav.Link
//           key={item.tab}
//           onClick={() => setActiveTab(item.tab)}
//           className={`d-flex align-items-center justify-content-center ${
//             activeTab === item.tab ? "bg-t text-white rounded" : "text-dark"
//           }`}
//           style={{
//             marginBottom: "10px",
//             padding: "10px",
//             flex: "1",
//           }}
//         >
//           <span className="icon">{item.icon}</span>
//           {/* Only show labels on medium or larger screens */}
//           <span className="label d-none d-md-inline">{item.label}</span>
//         </Nav.Link>
//       ))}
//     </Nav>
//   );
// };

// export default Sidebar;

import React from "react";
import { Nav, Collapse } from "react-bootstrap";
import {
  FaUser,
  FaBook,
  FaCalendarAlt,
  FaChartBar,
  FaChalkboardTeacher,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    {
      label: "Profile",
      icon: <FaUser />,
      tab: "profile",
      roles: ["teacher", "admin"],
      outsideDropdown: true,
    },
    {
      label: "Classroom",
      icon: <FaChalkboardTeacher />,
      tab: "Classroom",
      roles: ["teacher", "admin"],
      outsideDropdown: true,
    },
    {
      label: "Subject",
      icon: <FaBook />,
      tab: "Subject",
      roles: ["teacher", "admin"],
      outsideDropdown: true,
    },
    // { label: "Grades", icon: <FaChartBar />, tab: "grades", roles: ["teacher", "admin"], outsideDropdown: true },
    {
      label: "Messages",
      icon: <FaEnvelope />,
      tab: "messages",
      roles: ["teacher", "admin"],
      belowDropdown: true,
    },
    {
      label: "Settings",
      icon: <FaCog />,
      tab: "settings",
      roles: ["teacher", "admin"],
      belowDropdown: true,
    },
    {
      label: "Logout",
      icon: <FaSignOutAlt />,
      tab: "Logout",
      roles: ["teacher", "admin"],
      belowDropdown: true,
    },
  ];

  const dropdownItems = [
    { label: "Classrooms", icon: <FaChalkboardTeacher />, tab: "Classrooms" },
    { label: "Subjects", icon: <FaBook />, tab: "Subjects" },
    { label: "Students", icon: <FaUser />, tab: "Students" },
    { label: "Teachers", icon: <FaUser />, tab: "Teachers" },
    { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule" },
  ];

  const outsideDropdownItems = navItems.filter(
    (item) => item.roles.includes(role) && item.outsideDropdown
  );
  const belowDropdownItems = navItems.filter(
    (item) => item.roles.includes(role) && item.belowDropdown
  );

  return (
    <Nav className="sidebar d-flex flex-column flex-sm-row flex-md-column bg-light shadow-sm p-3">
      {outsideDropdownItems.map((item) => (
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
          <span className="label d-none d-md-inline">{item.label}</span>
        </Nav.Link>
      ))}

      {/* Dropdown for Admin */}
      {role === "admin" && (
        <div className="dropdown-container">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="d-flex align-items-center justify-content-center text-dark rounded"
            style={{
              marginBottom: "10px",
              padding: "10px",
              flex: "1",
              cursor: "pointer",
            }}
          >
            <div className="d-flex align-items-center">
              <span className="icon me-2">{<FaUser />}</span>
              <span className="label">Admin</span>
            </div>
            <span className="icon ms-2">
              {isDropdownOpen ? <FaChevronRight /> : <FaChevronDown />}
            </span>
          </div>
          <Collapse in={isDropdownOpen}>
            <div>
              {dropdownItems.map((item) => (
                <Nav.Link
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`d-flex align-items-center justify-content-center ${
                    activeTab === item.tab
                      ? "bg-t text-white rounded"
                      : "text-dark"
                  }`}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    flex: "1",
                  }}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label d-none d-md-inline">{item.label}</span>
                </Nav.Link>
              ))}
            </div>
          </Collapse>
        </div>
      )}

      {/* Items below the dropdown */}
      {belowDropdownItems.map((item) => (
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
          <span className="label d-none d-md-inline">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
