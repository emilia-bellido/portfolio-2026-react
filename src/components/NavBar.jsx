import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
    return (
        <Navbar id="nav-style" expand="lg" className="rounded-5 col-8 mx-auto">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#all-works">Projects</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                        {/* The text and icon must go inside the tags */}
                        <Nav.Link href="/resume.pdf" download="Emilia_Bellido_Resume.pdf">
                            <i id="icon-nav" className="bi bi-download pe-2"></i>Resume
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    ); 
};

export default NavBar;