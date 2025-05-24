import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSuject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, isSending] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer); // cleanup on unmount or if success changes
    }
  }, [success]);

  const sendMessage = async (e) => {
    e.preventDefault();
    isSending(true);
    setSuccess(null); // clear previous message

    const formData = {
      fullName,
      phone,
      subject,
      message,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/send-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json(); // ✅ Correct way

      if (response.ok && data.success) {
        setSuccess("✅ Enquiry Sent Successfully");
        setFullName("");
        setPhone("");
        setSuject("");
        setMessage("");
      } else {
        setSuccess("❌ " + (data.message || "Something went wrong."));
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSuccess("An error occurred. Please try again later.");
    } finally {
      isSending(false);
    }
  };

  return (
    <section style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
      <Container>
        <h2
          className="text-center mb-4 fontColor"
          style={{ fontWeight: "700" }}
        >
          Contact Us
        </h2>
        <p className="text-center mb-5" style={{ color: "#6c757d" }}>
          We'd love to hear from you! Feel free to get in touch with us for any
          inquiries or assistance.
        </p>
        <Row>
          <Col md={6}>
            <Form onSubmit={sendMessage}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSuject(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              {success && (
                <div
                  className={`alert ${
                    success.startsWith("✅") ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {success}
                </div>
              )}

              <Button type="submit" className="w-100 bg-t" disabled={sending}>
                {sending ? "Sending" : "Send Message"}
              </Button>
            </Form>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h5 style={{ color: "#010101" }}>Contact Information</h5>
            <ul className="list-unstyled mt-3" style={{ color: "#6c757d" }}>
              <li>
                <strong>Address:</strong> 26 Ichie Dara Avenue, Shibiri, Lagos
              </li>
              <li>
                <strong>Phone:</strong> +234 806 054 0369
              </li>
              <li>
                <strong>Email:</strong> charitydara0@gmail.com
              </li>
              <li>
                <strong>Office Hours:</strong> Mon - Fri, 8:00 AM - 5:00 PM
              </li>
            </ul>

            <div className="mt-3">
              <h5 style={{ color: "#01010" }}>Follow Us</h5>
              <div className="d-flex flex-row gap-3 mt-2">
                <a
                  href="https://web.facebook.com/ogaraku.charitydara"
                  target="_blank"
                  style={{
                    color: "#4267B2",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>

                {/* Other Social Media Links commented out  */}
                <a
                  href="mailto:charitydara0@gmail.com"
                  style={{
                    color: "#010101",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i class="fa-solid fa-envelope"></i>
                </a>
                {/* <a
                  href="#"
                  style={{
                    color: "#C13584",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  style={{
                    color: "#2867B2",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
