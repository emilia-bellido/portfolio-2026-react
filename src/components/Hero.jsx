import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { ProjectContext } from '../context/ProjectContext';
import { useContext } from 'react';

const Hero = () => {
  return (
    <Container className="px-0 mb-5 text-center d-flex">
      <div className="col-md-6 col-12">
         <h1 className="fw-bold mb-3">Hi, I'm Emilia.</h1>
        <p className="fs-5 mb-4 text-center">
          I blend technical logic with digital storytelling to help purpose-driven organizations share their true vision.
        </p>

      </div>
      <div className="col-md-6 col-12">
        <div>
          <Image src="../assets/emilia_profile.JPG" rounded />

        </div>

      </div>
     

      
    </Container>
  );
};

export default Hero;