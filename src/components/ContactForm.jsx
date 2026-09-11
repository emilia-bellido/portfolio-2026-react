import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FaRegCopy } from "react-icons/fa6";
import Container from 'react-bootstrap/Container';

export default function ContactForm() {
  const [status, setStatus] = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "emiliaf.bellido@gmail.com";

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", import.meta.env.WEB3FORMS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Thanks! Your message has been sent." });
        event.target.reset();
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong sending your message. Please try again, or email me directly."
        });
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setStatus({
        type: "error",
        message: "Something went wrong sending your message. Please try again, or email me directly."
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <Form id="contact-form" className="m-5 pb-5" onSubmit={onSubmit}>
      <Form.Control name="botcheck" type="checkbox" style={{ display: 'none' }} />
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your Name" required />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your Email" required />
          </Form.Group>
        </div>
      </div>

      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Message</Form.Label>
        <Form.Control name="message" as="textarea" rows={4} placeholder="Message" required />
      </Form.Group>

      {status && (
        <Alert
          variant={status.type === "success" ? "success" : "danger"}
          onClose={() => setStatus(null)}
          dismissible
        >
          {status.message}
        </Alert>
      )}

      <Container className="d-flex flex-wrap align-items-center">
        <Button
          variant="outline-light"
          className="rounded-pill px-4 me-3 fw-medium"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Submit"}
        </Button>

        <Button
          onClick={handleCopy}
          variant="outline-light"
          className="rounded-pill px-4 fw-medium"
          type="button"
        >
          <FaRegCopy className="mx-2 me-2" />
          {copied ? "Copied!" : "Copy Email"}
        </Button>
      </Container>
    </Form>
  );
}