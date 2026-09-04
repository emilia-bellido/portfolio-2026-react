import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
    return ( // <-- Add return here
        <Navbar id="nav-style" expand="lg" className="rounded-5">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#home">About</Nav.Link>
                    <Nav.Link href="#featured">Projects</Nav.Link>
                    <Nav.Link href="#contant">Contact</Nav.Link>
                    <Nav.Link href="#contact"> <i id="icon-nav" clasName="bi bi-download pe-2"></i>Resume</Nav.Link> 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    ); // <-- Close parenthesis here
};

export default NavBar;