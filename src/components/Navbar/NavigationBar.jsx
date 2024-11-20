import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">King's College</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/school">SCHOOL PORTAL</Nav.Link>
            <Nav.Link href="/aboutUs">ABOUT US</Nav.Link>
            <Nav.Link href="/events">EVENTS</Nav.Link>
            <Nav.Link href="/ourGallery">OUR GALLERY</Nav.Link>
            <Nav.Link href="/news">NEWS</Nav.Link>
            <Nav.Link href="/pta">P.T.A</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;