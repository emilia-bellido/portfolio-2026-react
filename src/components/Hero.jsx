import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

const Hero = () => {
  return (
    <Container fluid className="px-0 mb-5">
      <h1 className="fw-bold mb-3">Hi, I'm Emilia.</h1>
      
      <p className="fs-5 mb-4" style={{ lineHeight: '1.6', maxWidth: '600px' }}>
        I blend technical logic with digital storytelling to help purpose-driven organizations share their true vision.
      </p>

      
    </Container>
  );
};

export default Hero;