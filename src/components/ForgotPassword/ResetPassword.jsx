import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  // const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setStatus("error");
      setMessage("Please select a role (Teacher or Student).");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);


      const apiUrl =
        role === "teacher"
          ? `${import.meta.env.VITE_API_BASE_URL}/teacher/reset-password`
          : `${import.meta.env.VITE_API_BASE_URL}/reset-password`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Password reset successful!");
        setShowSuccessModal(true);
        // Redirect based on role
        setTimeout(() => {
          navigate("/school");
        }, 3000);
        localStorage.removeItem("email");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          /> */}

          {/* Role Selection */}
          <div className="mb-3 text-center">
            <div className="btn-group">
              <button
                type="button"
                className={`btn ${role === "teacher" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("teacher")}
              >
                Teacher
              </button>
              <button
                type="button"
                className={`btn ${role === "student" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("student")}
              >
                Student
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter reset token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control mb-3"
          />

          <button type="submit" className="btn btn-primary w-100">
          {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
          </button>
        </form>

        {/* Feedback Messages */}
        {message && (
          <div
            className={`alert mt-3 ${
              status === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>

       {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password reset successful.
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResetPassword;
