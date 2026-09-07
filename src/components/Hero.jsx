import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

// 1. Import the image file directly
import profilePic from '../assets/emilia_photo.JPG';

const Hero = () => {
  return (
    <Container className="mb-5">
      <div className="text-start">
        <p className="fw-bold text-muted-custom">Creative Technologist</p>
        <h1 className="fw-bold mb-3">Hi, I'm Emilia.</h1>
        <div className="d-flex flex-wrap text-start">
          <p className="m-1">I want to <strong>HELP</strong> your brand connect with the world.</p>
          <p className="m-1">From building a website to editing a promotional video. </p>
          <p className="m-1">I blend technical logic with digital storytelling to help purpose-driven
          organizations share their vision.</p>
  
        </div>
      </div>
     
    </Container>
  );
};

export default Hero;3