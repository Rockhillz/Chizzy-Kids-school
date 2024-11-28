import React, { useState } from 'react';
import { Button, Form, Collapse } from 'react-bootstrap';

const ToggleFormImage = ({linkup}) => {
    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            {/* Icon Button with Image */}
            <Button
                variant="primary"
                onClick={handleToggle || linkup}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    padding: '10px',
                    zIndex: 1000,
                }}
            >
                <img
                    src="https://cdn-icons-png.freepik.com/256/9794/9794211.png?semt=ais_hybrid" // Replace with your image URL
                    alt="Toggle Form"
                    style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'cover',
                    }}
                />
            </Button>

            {/* Collapsible Form */}
            <Collapse in={showForm}>
                <div
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '20px',
                        width: '300px',
                        zIndex: 1000,
                        padding: '20px',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Form style={{height:'550px'}}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mt-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>

                        <Form.Group controlId="phone" className="mt-2">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter your phone number" />
                        </Form.Group>

                        {/* Radio Buttons */}
                        <Form.Group className="mt-2">
                            <Form.Label>* <b>let us know u better...</b></Form.Label>
                            <Form.Check
                                type="radio"
                                id="radio1"
                                label="Social Media"
                                name="contactMethod"
                                value="socialMedia"
                            />
                            <Form.Check
                                type="radio"
                                id="radio2"
                                label="Friend/Family"
                                name="contactMethod"
                                value="friendFamily"
                            />
                            <Form.Check
                                type="radio"
                                id="radio3"
                                label="Other"
                                name="contactMethod"
                                value="other"
                            />
                        </Form.Group>

                        {/* Textarea */}
                        <Form.Group controlId="textarea" className="mt-2">
                            <Form.Label>Your Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter any additional information here..."
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className='mt-2'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
};

export default ToggleFormImage;
