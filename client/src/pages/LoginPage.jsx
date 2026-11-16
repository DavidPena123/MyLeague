import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // email and password are already in state here
        console.log({ email, password });
    };

    return (
        <Container fluid="md">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card className="text-center">
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="my-3" controlId="loginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="loginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" size="lg">Log in</Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted"></Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default LoginPage;