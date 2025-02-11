import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Contact = () => {
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
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Type your message here..."
                />
              </Form.Group>
              <Button type="submit" className="w-100 bg-t">
                Send Message
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
                <strong>Email:</strong> info@chizzykids.edu.ng
              </li>
              <li>
                <strong>Office Hours:</strong> Mon - Fri, 8:00 AM - 5:00 PM
              </li>
            </ul>
            
            <div className="mt-3">
              <h5 style={{ color: "#01010" }}>Follow Us</h5>
              <div className="d-flex flex-row gap-3 mt-2">
                <a
                  href="#"
                  style={{
                    color: "#4267B2",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="#"
                  style={{
                    color: "#010101",
                    fontSize: "24px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
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
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
