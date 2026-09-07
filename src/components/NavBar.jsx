import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TbMenu4 } from "react-icons/tb";

const NavBar = () => {
    return (
        <Navbar collapseOnSelect id="nav-style" expand="lg" className="rounded-5 col-8 mx-auto sticky-top">
            <Container className="position-relative"> 
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <TbMenu4 size="3rem" />
                </Navbar.Toggle>
                 
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto text-center mt-3 mt-lg-0">
                        <Nav.Link href="#all-works">Projects</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
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