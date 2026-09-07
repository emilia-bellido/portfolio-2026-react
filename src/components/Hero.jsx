import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

// 1. Import the image file directly
import profilePic from '../assets/emilia_photo.JPG';

const Hero = () => {
  return (
    <Container className="px-0 mb-5">
      <div className="text-start">
        <p className="fw-bold text-muted-custom">Creative Technologist</p>
        <h1 className="fw-bold mb-3">Hi, I'm Emilia.</h1>
        <p className="fs-5 mb-4 text-center">
          My goal is <strong>SIMPLE</strong>: help your brand connect with the world.  <br>
          From building a website to editing a promotional video<br>
          I blend technical logic with digital storytelling to help purpose-driven<br>
          organizations share their vision.
  
        </p>
      </div>
     
    </Container>
  );
};

export default Hero;3