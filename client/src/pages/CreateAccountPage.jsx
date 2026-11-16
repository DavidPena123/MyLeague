import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {

    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submissionInProgress = useRef(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
        setErrors((previousErrors) => ({ ...previousErrors, [name]: "", submit: "" }));
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (submissionInProgress.current) {
            return;
        }

        const email = form.email.trim().toLowerCase();
        const newErrors = {};

        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!(form.password.length >= 8 && form.password.length <= 128)) {
            newErrors.password = "Use a password between 8 and 128 characters.";
        }

        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Passwords don't match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        submissionInProgress.current = true;
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: form.password }),
            });

            if (response.status !== 201) {
                const result = await response.json().catch(() => null);
                const message = typeof result?.message === 'string' && result.message
                    ? result.message
                    : 'Unable to create your account. Please try again later.';

                if (response.status === 409) {
                    setErrors({ email: message });
                } else {
                    setErrors({ submit: message });
                }
                return;
            }

            setForm({ email, password: '', confirmPassword: '' });
            navigate('/verify-email', { replace: true, state: { email } });
        } catch {
            setErrors({ submit: 'Unable to reach the server. Check your connection and try again.' });
        } finally {
            submissionInProgress.current = false;
            setIsSubmitting(false);
        }
    };


    return (
        <Container fluid="md">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card className="text-center">
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Card.Title>Create An Account</Card.Title>

                            {errors.submit && (
                                <Alert variant="danger" role="alert">{errors.submit}</Alert>
                            )}

                            <Form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>

                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        maxLength={254}
                                        disabled={isSubmitting}
                                        placeholder="Enter email"
                                        value={form.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        minLength={8}
                                        maxLength={128}
                                        disabled={isSubmitting}
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <p className="text-start small mt-2 mb-0 text-muted">
                                        Between 8 and 128 characters
                                    </p>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        maxLength={128}
                                        disabled={isSubmitting}
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted"></Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateAccountPage;
