// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import "./schoolportal.css";

// const SchoolPortal = () => {
//   const [role, setRole] = useState("");

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <section className="container-fluid" id="mainBox">
//         <div className="container"  style={{ marginTop: "70px" }}>
//       <h1>Login to your Dashboard</h1>

//       <div className="display">
//         <div>
//           <div className=" ms-4">
//             <h2>Welcome to the School Portal</h2>
//             <p>Please login to access your account.</p>
//           </div>
//         </div>

//         <div>
//           <Container className="d-flex justify-content-center align-items-center vh-100">
//             <Row>
//               <Col md={12}>
//                 <div
//                   className="p-4 border rounded shadow"
//                   style={{ width: "500px", height: "500px" }}
//                 >
//                   <h3 className="text-center mb-4">Sign In</h3>
//                   <Form>
//                     <Form.Group controlId="formUsername" className="mb-3">
//                       <Form.Label>Username</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter username"
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group controlId="formPassword" className="mb-3">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         placeholder="Enter password"
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                       <Form.Check
//                         type="radio"
//                         label="Login as a Teacher"
//                         name="role"
//                         value="teacher"
//                         checked={role === "teacher"}
//                         onChange={handleRoleChange}
//                       />
//                       <Form.Check
//                         type="radio"
//                         label="Login as a Student"
//                         name="role"
//                         value="student"
//                         checked={role === "student"}
//                         onChange={handleRoleChange}
//                       />
//                     </Form.Group>

//                     <Form.Group className="d-flex justify-content-between mb-3">
//                       <Form.Check type="checkbox" label="Remember me" />
//                       <a
//                         href="/forgot-password"
//                         className="text-decoration-none ms-4"
//                       >
//                         Forgot Password?
//                       </a>
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="w-100">
//                       Login
//                     </Button>
//                   </Form>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </div>
//     </section>
    
//   );
// };

// export default SchoolPortal;

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./schoolportal.css";

const SchoolPortal = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <section className="container-fluid" id="mainBox">
      <Container>
        {/* <h1 className="text-center">Login to your Dashboard</h1> */}

        <Row className="align-items-center justify-content-center mt-5 display">
          {/* Welcome Message */}
          <Col xs={12} md={6} className="text-center text-md-start mb-4">
            <div className="ms-md-4">
              <h2>Welcome to the School Portal</h2>
              <p>Please login to access your account.</p>
            </div>
          </Col>

          {/* Login Form */}
          <Col xs={12} md={6}>
            <div className="p-4 mb-5 mt-5 border rounded shadow mx-auto" style={{ maxWidth: "400px" }}>
              <h3 className="text-center mb-4">Sign In</h3>
              <Form>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Login as a Teacher"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={handleRoleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Login as a Student"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={handleRoleChange}
                  />
                </Form.Group>

                <Form.Group className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a
                    href="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </a>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SchoolPortal;
