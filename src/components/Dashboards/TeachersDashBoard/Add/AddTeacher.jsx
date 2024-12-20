// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col, Alert, Spinner, } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// const AddTeacher = ({ onBack }) => {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [teacherData, setTeacherData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     role: "teacher",
//     image: null,
//     department: "",
//     address: "",
//     phone: "",
//     gender: "",
//     dateOfBirth: "",
//     previous_school: "",
//     qualification: [""],
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setTeacherData({ ...teacherData, [name]: files[0] });
//     } else {
//       setTeacherData({ ...teacherData, [name]: value });
//     }
//   };

//   const handleQualificationChange = (index, value) => {
//     const updatedQualifications = [...teacherData.qualification];
//     updatedQualifications[index] = value;
//     setTeacherData({ ...teacherData, qualification: updatedQualifications });
//   };

//   const addQualificationField = () => {
//     setTeacherData({
//       ...teacherData,
//       qualification: [...teacherData.qualification, ""],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (teacherData.password !== confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const formData = new FormData();
//       Object.entries(teacherData).forEach(([key, value]) => {
//         if (key === "qualification") {
//           value.forEach((qual, index) =>
//             formData.append(`qualification[${index}]`, qual)
//           );
//         } else {
//           formData.append(key, value);
//         }
//       });

//       const response = await fetch(
//         `https://chizzykids-server.onrender.com/api/register/teacher`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Teacher created successfully!");
//         setErrorMessage("");
//         setLoading(false);
//         navigate("/teacher-details", { state: teacherData });
//       } else {
//         setErrorMessage(
//           data.message || "An error occurred while creating the teacher."
//         );
//       }
//     } catch (error) {
//       console.error("Error creating teacher:", error);
//       setErrorMessage("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={8} lg={6}>
//           <div className="d-flex mt-5 mb-3 justify-content-between">
//             <h2 className="">Add Teacher</h2>
//             <Button variant="outline-primary" onClick={onBack} className="tex-end" style={{height: ""}}>
//             Back
//             </Button>
//           </div>

//           {successMessage && <Alert variant="success">{successMessage}</Alert>}
//           {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullname"
//                 value={teacherData.fullname}
//                 onChange={handleInputChange}
//                 placeholder="Enter full name"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={teacherData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <div className="position-relative">
//                 <Form.Control
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={teacherData.password}
//                   onChange={handleInputChange}
//                   placeholder="Enter password"
//                   required
//                 />
//                 <Button
//                   variant="light"
//                   className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowPassword((prev) => !prev);
//                   }}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </Button>
//               </div>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Confirm Password</Form.Label>
//               <div className="position-relative">
//                 <Form.Control
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Re-enter password"
//                   required
//                 />
//                 <Button
//                   variant="light"
//                   className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowConfirmPassword((prev) => !prev);
//                   }}
//                 >
//                   {showConfirmPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </Button>
//               </div>
//             </Form.Group>



//             <Form.Group className="mb-3">
//               <Form.Label>Qualifications</Form.Label>
//               {teacherData.qualification.map((qual, index) => (
//                 <div key={index} className="d-flex mb-2">
//                   <Form.Control
//                     type="text"
//                     value={qual}
//                     onChange={(e) =>
//                       handleQualificationChange(index, e.target.value)
//                     }
//                     placeholder="Enter qualification"
//                     required
//                   />
//                 </div>
//               ))}
//               <Button
//                 variant="outline-secondary"
//                 onClick={addQualificationField}
//               >
//                 Add Qualification
//               </Button>
//             </Form.Group>



//             <Button
//               variant="primary"
//               type="submit"
//               className="w-100"
//               disabled={loading}
//             >
//               {loading ? (
//                 <Spinner animation="grow" size="sm" className="me-2" />
//               ) : (
//                 "Submit"
//               )}
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddTeacher;

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddTeacher = ({ onBack }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [teacherData, setTeacherData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "teacher",
    image: null,
    department: "",
    address: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    previous_school: "",
    qualification: [""],
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setTeacherData({ ...teacherData, [name]: files[0] });
    } else {
      setTeacherData({ ...teacherData, [name]: value });
    }
  };

  const handleQualificationChange = (index, value) => {
    const updatedQualifications = [...teacherData.qualification];
    updatedQualifications[index] = value;
    setTeacherData({ ...teacherData, qualification: updatedQualifications });
  };

  const addQualificationField = () => {
    setTeacherData({
      ...teacherData,
      qualification: [...teacherData.qualification, ""],
    });
  };

  const removeQualificationField = (index) => {
    const updatedQualifications = teacherData.qualification.filter(
      (_, i) => i !== index
    );
    setTeacherData({ ...teacherData, qualification: updatedQualifications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teacherData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(teacherData).forEach(([key, value]) => {
        if (key === "qualification") {
          value.forEach((qual, index) =>
            formData.append(`qualification[${index}]`, qual)
          );
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        `https://chizzykids-server.onrender.com/api/register/teacher`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Teacher created successfully!");
        setErrorMessage("");
        setLoading(false);
        navigate("/teacher-details", { state: teacherData });
      } else {
        setErrorMessage(
          data.message || "An error occurred while creating the teacher."
        );
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex mt-5 mb-3 justify-content-between">
            <h2>Add Teacher</h2>
            <Button variant="outline-primary" onClick={onBack}>
              Back
            </Button>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={teacherData.fullname}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={teacherData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
                <Button
                  variant="light"
                  className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
                <Button
                  variant="light"
                  className="position-absolute top-50 end-0 me-2 translate-middle-y p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword((prev) => !prev);
                  }}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={teacherData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required
              />
            </Form.Group>

            <Form.Group controlId="department" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={teacherData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Science">Science</option>
                <option value="Art and Commercial">Art and Commercial</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={teacherData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={teacherData.role}
                onChange={handleInputChange}
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={teacherData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={teacherData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="previous_school" className="mb-3">
              <Form.Label>Previous School</Form.Label>
              <Form.Control
                type="text"
                name="previous_school"
                value={teacherData.previous_school}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Qualifications</Form.Label>
              {teacherData.qualification.map((qual, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    value={qual}
                    onChange={(e) =>
                      handleQualificationChange(index, e.target.value)
                    }
                    placeholder="Enter qualification"
                    required
                  />
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => removeQualificationField(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                onClick={addQualificationField}
              >
                Add Qualification
              </Button>
            </Form.Group>

            <div className="mt-3">
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTeacher;
