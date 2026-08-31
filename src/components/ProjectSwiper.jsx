import React from 'react';
import { useContext } from 'react';

import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from './ProjectCard';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectSwiper = () => {

  const { myProjects } = useContext(ProjectContext);

  //const filteredProjects = myProjects.filter((project) => project.featured === true);

  return (
    <div className="container py-5" style={{ height: '600px' }}> 
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        
        effect="coverflow"
        direction="vertical"
        slidesPerView={3}
        spaceBetween={8}
        speed={200}
        grabCursor={true}
        loop={true}
        
        coverflowEffect={{
          rotate: 5,
          modifier: 2,
          slideShadows: false // Recommended for clean glassmorphism designs
        }}
        
        navigation={true}
        pagination={{ clickable: true }}
        
        className="h-100"
      >
        {myProjects.map((project) => (
          <SwiperSlide key={project.id}>
            
            <div className="h-100 d-flex align-items-center justify-content-center">
              <ProjectCard 
                id = {project.id}
                title = {project.title}
                image = {project.image}
              />
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
};

export default ProjectSwiper;