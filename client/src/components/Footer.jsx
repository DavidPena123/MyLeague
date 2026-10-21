import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Footer() {
    return (
        <footer className="tbr-footer py-4 mt-5">
            <Container>
                <Row className="g-4">
                    {/* League Information */}
                    <Col xs={12} md={6} lg={3}>
                        <h5>Tracy Babe Ruth</h5>
                        <p>
                            Providing youth baseball and softball opportunities in Tracy,
                            California.
                        </p>
                        <p>
                            Legacy Fields
                            <br />
                            4901 N Tracy Blvd
                            <br />
                            Tracy, CA
                        </p>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={12} md={6} lg={3}>
                        <h5>Contact Information</h5>
                        <p>
                            PO Box 1307
                            <br />
                            Tracy, CA 95378
                        </p>
                        <p>
                            Fields Hotline: <a href="tel:+12098316350">(209) 831-6350</a>
                        </p>
                    </Col>

                    {/* Social Media Links and Icons */}
                    <Col xs={12} md={6} lg={3}>
                        <h5>Follow Us</h5>
                        <nav className="d-flex flex-wrap gap-3" aria-label="Social media">
                            <a
                                href="https://www.facebook.com/TracyBabeRuth/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-inline-flex align-items-center gap-2"
                            >
                                <i className="bi bi-facebook" aria-hidden="true"></i>
                                Facebook
                            </a>
                            {/* Instagram: temporary homepage link */}
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-inline-flex align-items-center gap-2"
                            >
                                <i className="bi bi-instagram" aria-hidden="true"></i>
                                Instagram
                            </a>
                        </nav>
                    </Col>

                    {/* Sponsors */}
                    <Col xs={12} md={6} lg={3}>
                        <h5>Our Sponsors</h5>
                        <p>Thank you to our league sponsors!</p>
                        <ul className="list-unstyled tbr-sponsor-list mb-0">
                            <li>Kona Ice</li>
                            <li>Clark Pest Control</li>
                            <li>Trosien Orthodontics</li>
                            <li>All American Sports Academy</li>
                            <li>Dick's Sporting Goods</li>
                            <li>Traina Thought Landscapes</li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4" />

                <p className="text-center mb-0">
                    &copy; 2026 Tracy Babe Ruth. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;