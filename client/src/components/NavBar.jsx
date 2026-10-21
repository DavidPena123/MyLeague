import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return (
        <Navbar expand="lg" className="tbr-nav">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src="/images/tbrLogo.png" alt="Tracy Babe Ruth Logo" height="80" />
                </Navbar.Brand>

                {/* Keeps the Home and User Portal buttons on the navbar for mobile users */}
                <Nav className="flex-row gap-2 d-lg-none">
                    <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                    <Nav.Link href="#">User Portal</Nav.Link>
                </Nav>

                <Navbar.Toggle aria-controls="mainNav" />
                <Navbar.Collapse id="mainNav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link href="#">League Information</Nav.Link>
                        <Nav.Link href="#">Upcoming Games</Nav.Link>
                        <Nav.Link href="#">About Us</Nav.Link>
                        <Nav.Link href="#">Sponsors</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">User Portal</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;