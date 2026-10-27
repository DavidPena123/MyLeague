import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function CreateAccountPage() {

    // 1. One object holds everything the user types
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" })

    // 2. Runs on every keystroke, in any field (updates the object)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    // 3. Runs when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); // stops the browser from reloading the page
        console.log(form); // temporary: check the values in the console
    };


    return (
        <Container fluid="md">
            <Row className="justify-content-center">
                <Card className="text-center">
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>Create An Account</Card.Title>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3 pt-5 px-5" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 px-5" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 px-5" controlId="formGroupConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary">Create Account</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </Row>
        </Container>
    );
}

export default CreateAccountPage;