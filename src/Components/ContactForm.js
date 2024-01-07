import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [allInfoProvided, setAllInfoProvided] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const toastRef = useRef(null);

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      name.trim() !== "" &&
      subject.trim() !== "" &&
      email.trim() !== "" &&
      message.trim() !== "";

    setAllInfoProvided(allFieldsFilled);
  }, [name, subject, email, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    try {
      setIsLoading(true);
      await fetch(process.env.REACT_APP_formSpree, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      // Show toast message on successful submission
      toastRef.current.show({
        severity: "success",
        summary: "Message sent successfully.",
      });

      // reset form fields and loading state on successful completion
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setAllInfoProvided(false);
    } catch (error) {
      // Show error message if submission fails
      toastRef.current.show({
        severity: "error",
        summary: "Failed to send message.",
      });
    } finally {
      setIsLoading(false); // Always reset loading state, regardless of success or failure
    }
  };

  return (
    <div className="col-12 col-sm-6 mx-auto contact-container">
      <Toast ref={toastRef} />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
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
            onChange={(e) => setSubject(e.target.value)}
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

        <button
          disabled={!allInfoProvided}
          type="submit"
          className="btn btn-warning w-100 text-white mt-3 position-relative"
        >
          <span className="spinner-container">
            {isLoading && (
              <ProgressSpinner
                style={{ width: "1.5rem", height: "1.5rem" }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                className="position-absolute top-50 start-50 translate-middle"
              />
            )}
          </span>
          Send Message
        </button>
      </Form>
    </div>
  );
}

export default ContactForm;
