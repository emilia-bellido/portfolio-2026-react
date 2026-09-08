import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegCopy } from "react-icons/fa6";
import Container from  'react-bootstrap/Container';


export default function ContactForm() {
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const email = "emiliaf.bellido@gmail.com";

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };
  
  const handleCopy = async () =>{
    try{
      await navigator.clipboard.writeText(email);
      setCopied(true);
    }catch(error){
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <Form id="contact-form" className="m-5 pb-5"    onSubmit={onSubmit}>
      <Form.Control name="botcheck" type="checkbox" style={{ display: 'none' }}/>
      <div className="row">

        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your Name" />
          </Form.Group>
        </div>

        <div className="col-md-6">
           <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your Email" />
          </Form.Group>
        </div>
      </div>
      
     

      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Message</Form.Label>
        <Form.Control name="message" as="textarea" 
      rows={4} placeholder="Message" />
      </Form.Group>
      <Container className="d-flex flex-wrap">
          <Button variant="outline-light" className="rounded-pill px-4 me-3 fw-medium" type="submit">
          Submit
        </Button>
        <p>{result}</p>
        <Button onClick={handleCopy} variant="outline-light" className="rounded-pill px-4 fw-medium" type="submit">
          <FaRegCopy className="me-2"/>
          {copied ? "Copied!" : "Copy Email"}
        </Button>
      </Container>
      
    </Form>
  );
}