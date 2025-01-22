

import React, { useState } from "react";
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
import "./sidebar.css";

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);

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
    {
      label: "Admin",
      icon: <FaUser />,
      tab: "Admin",
      roles: [ "admin"],
      outsideDropdown: true,
    },
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

  // const dropdownItems = [
  //   { label: "Classrooms", icon: <FaChalkboardTeacher />, tab: "Classrooms" },
  //   { label: "Subjects", icon: <FaBook />, tab: "Subjects" },
  //   { label: "Students", icon: <FaUser />, tab: "Students" },
  //   { label: "Teachers", icon: <FaUser />, tab: "Teachers" },
  //   { label: "Schedule", icon: <FaCalendarAlt />, tab: "schedule" },
  // ];

  const outsideDropdownItems = navItems.filter(
    (item) => item.roles.includes(role) && item.outsideDropdown
  );
  const belowDropdownItems = navItems.filter(
    (item) => item.roles.includes(role) && item.belowDropdown
  );

  return (
    <Nav className="sidebar d-flex flex-row flex-sm-column flex-md-column bg-light shadow-sm p-1">
      {/* Items outside the dropdown */}
      {outsideDropdownItems.map((item) => (
        <Nav.Link
          key={item.tab}
          onClick={() => setActiveTab(item.tab)}
          className={`d-flex align-items-center ${
            activeTab === item.tab ? "bg-t text-white rounded" : "text-dark"
          }`}
          style={{ padding: "10px" }}
        >
          <span className="icon me-2">{item.icon}</span>
          <span className="label d-none d-md-inline">{item.label}</span>
        </Nav.Link>
      ))}

      {/* Dropdown for Admin */}
      {/* {role === "admin" && (
        <div className="dropdown">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="d-flex align-items-center text-dark dropdown-toggle"
            style={{ padding: "10px", cursor: "pointer" }}
          >
            <span className="icon me-2">{<FaUser />}</span>
            <span className="label">Admin</span>
            <span className="icon ms-auto">
              {isDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          <Collapse  in={isDropdownOpen}>
            <div>
              {dropdownItems.map((item) => (
                <Nav.Link
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`d-flex align-items-center ${
                    activeTab === item.tab
                      ? "bg-t text-white rounded"
                      : "text-dark"
                  }`}
                  style={{ padding: "10px" }}
                >
                  <span className="icon me-2">{item.icon}</span>
                  <span className="label d-none d-md-inline">{item.label}</span>
                </Nav.Link>
              ))}
            </div>
          </Collapse>
        </div>
      )} */}

      {/* Items below the dropdown */}
      {belowDropdownItems.map((item) => (
        <Nav.Link
          key={item.tab}
          onClick={() => setActiveTab(item.tab)}
          className={`d-flex align-items-center ${
            activeTab === item.tab ? "bg-t text-white rounded" : "text-dark"
          }`}
          style={{ padding: "10px" }}
        >
          <span className="icon me-2">{item.icon}</span>
          <span className="label d-none d-md-inline">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
