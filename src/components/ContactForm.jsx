import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <Form className="m-5 my-3"    onSubmit={onSubmit}>
      <Form.Control name="botcheck" type="checkbox" style={{ display: 'none' }}/>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter your Name" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter your Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Message</Form.Label>
        <Form.Control name="message" as="textarea" 
      rows={4} placeholder="Message" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p>{result}</p>
    </Form>
  );
}