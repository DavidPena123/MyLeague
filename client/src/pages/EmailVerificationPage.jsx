import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

function EmailVerificationPage() {
    const { state } = useLocation();
    const email = typeof state?.email === 'string' ? state.email : '';

    return (
        <Container fluid="md" className="py-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h1" className="h3">Verify Your Email</Card.Title>
                            {email && <p>Account created for <strong>{email}</strong>.</p>}
                            <p>Email verification is required to finish setting up your account.</p>
                            <p id="verification-status" className="text-secondary">
                                Verification code delivery and submission are not connected yet.
                                You do not need to create another account.
                            </p>
                            <Form.Group className="mb-3" controlId="verificationCode">
                                <Form.Label>Verification code</Form.Label>
                                <Form.Control
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    aria-describedby="verification-status"
                                    disabled
                                />
                            </Form.Group>
                            <Button variant="primary" disabled>Verify Email</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EmailVerificationPage;
