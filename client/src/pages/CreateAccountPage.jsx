import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function CreateAccountPage() {

    // 1. One object holds everything the user types
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" })

    //using for email validation
    const [errors, setErrors] = useState({});

    // The three password rules, recalculated on every render
    const rules = [
        { label: "At least 8 characters", met: form.password.length >= 8 },
        { label: "Contains a letter", met: /[A-Za-z]/.test(form.password) },
        { label: "Contains a number", met: /\d/.test(form.password) },
    ];

    // 2. Runs on every keystroke, in any field (updates the object)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };


    // 3. Runs when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); // stops the browser from reloading the page

        const email = form.email.trim();
        const newErrors = {};

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!rules.every((rule) => rule.met)) {
            newErrors.password = "Password doesn't meet all the requirements.";
        }

        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Passwords don't match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // stop before anything is sent
        }

        console.log({ ...form, email }); // temporary: check the values in the console
    };


    return (
        <Container fluid="md">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5}>
                    <Card className="text-center">
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Card.Title>Create An Account</Card.Title>

                            <Form onSubmit={handleSubmit} noValidate>

                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
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
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <ul className="list-unstyled text-start small mt-2 mb-0">
                                        {rules.map((rule) => (
                                            <li
                                                key={rule.label}
                                                className={rule.met ? "text-success" : "text-muted"}
                                            >
                                                {rule.label}
                                            </li>
                                        ))}
                                    </ul>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="primary" size="lg">Create Account</Button>
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