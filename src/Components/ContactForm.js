import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    const userInfo = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    // Submit to formspree
    fetch(process.env.REACT_APP_formSpree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <div className="container p-5 w-50">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" >
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formName" className="mt-2">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="warning" className="text-white mt-4 w-100 p-3" type="submit">
          Send Message
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;
