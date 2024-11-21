import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'


function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarBox">
      <Container>
        <Navbar.Brand className='text-light' href="#home">King's College</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link className='text-light' href="/">HOME</Nav.Link>
            <Nav.Link className='text-light' href="/school">SCHOOL PORTAL</Nav.Link>
            <Nav.Link className='text-light' href="/aboutUs">ABOUT US</Nav.Link>
            <Nav.Link className='text-light' href="/events">EVENTS</Nav.Link>
            <Nav.Link className='text-light' href="/ourGallery">OUR GALLERY</Nav.Link>
            <Nav.Link className='text-light' href="/news">NEWS</Nav.Link>
            <Nav.Link className='text-light' href="/pta">P.T.A</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;