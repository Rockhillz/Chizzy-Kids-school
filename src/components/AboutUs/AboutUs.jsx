

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className='py-5'>
      <Container className="about-us-container ">
      <>
  
        <div md={6}>
          <h1 className='d-flex justify-content-center'>About Chizzy Kids School</h1>
          <p>
            Chizzy Kids Group of Schools is a leading educational institution in Nigeria dedicated to nurturing young minds and fostering academic, moral, and social excellence. Established with the mission of providing world-class education tailored to the Nigerian context, our school is committed to raising a generation of confident, innovative, and responsible future leaders. At Chizzy Kids, we believe that education goes beyond the classroom. Our approach combines rigorous academics with a variety of extracurricular activities, ensuring that every child develops holistically in a secure and supportive environment.
          </p>
        </div>
      </>

      <Row>
        <Col>
          <h3>Our Missions</h3>
          <ul>
            <li>To guarantee attainment of Academic perfection.</li>
            <li>To provide total education to create and develop leadership in Nigeria children.</li>
            <li>To provide a calm, peaceful, and beautiful but enabling Environment for the good upbringing of Nigeria Youths, teaching peaceful Co-existence and acts of kindness.</li>
            <li>To raise prominent, noticeable, distinguished, devoted, and patriotic citizens and "Builders of Bridges".</li>
            <li>To induce and inculcate aristocracy and nobility in children at an impressionable age.</li>
            <li>To develop, nurture, and groom global citizens.</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Our Vision</h3>
          <div className="values">
            <p>Excellent in learning and character.</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Why Choose Chizzy Kids Group of Schools?</h3>
          <ul>
            <li>
              <b>Qualified Educators:</b> Our team of highly trained and experienced teachers is passionate about inspiring and guiding students.
            </li>
            <li>
              <b>Modern Facilities:</b> We provide a well-equipped learning environment with up-to-date classrooms, libraries, ICT labs, and sports facilities.
            </li>
            <li>
              <b>Holistic Development:</b> Our curriculum integrates academic studies with arts, sports, leadership programs, and moral instruction.
            </li>
            <li>
              <b>Focus on Values:</b> We emphasize discipline, respect, and empathy to ensure our students grow into responsible citizens.
            </li>
            <li>
              <b>Global Perspective:</b> While grounded in Nigerian culture, we incorporate international standards and practices to prepare students for global competitiveness.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutUs;