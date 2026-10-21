import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Banner() {
    return (
        <section className="banner-wrap">
            <Container fluid className="d-flex justify-content-center">
                <Row>
                    <Col xs={12}>
                        <img
                            src="/images/tbrbanner2022.png"
                            className="img-fluid"
                            alt="Tracy Babe Ruth Banner"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Banner;