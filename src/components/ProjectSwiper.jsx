import React from 'react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectSwiper = () => {
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
        <SwiperSlide>
          <div className="glass-card p-5 h-100 d-flex align-items-center justify-content-center">
            <h2>Slide 1</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="glass-card p-5 h-100 d-flex align-items-center justify-content-center">
            <h2>Slide 2</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="glass-card p-5 h-100 d-flex align-items-center justify-content-center">
            <h2>Slide 3</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="glass-card p-5 h-100 d-flex align-items-center justify-content-center">
            <h2>Slide 4</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProjectSwiper;