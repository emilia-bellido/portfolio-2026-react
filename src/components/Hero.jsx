import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

const Hero = () => {
  return (
    <Container className="px-0 mb-5 text-center">
      <h1 className="fw-bold mb-3">Hi, I'm Emilia.</h1>
      <p className="fs-5 mb-4 text-center">
        I blend technical logic with digital storytelling to help purpose-driven organizations share their true vision.
      </p>

      
    </Container>
  );
};

export default Hero;