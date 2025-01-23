"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import style from  "./index.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SwiperSlider() {
    const heroImages=["/images/jobslide1.jpg","/images/global.jpg","/images/jobslide3.jpg","/images/jobslide4.jpg"];
  return (
   <div className=' w-[98vw] h-[320px] md:h-[320px] lg:h-[320px] flex justify-center items-center m-auto mt-0 '>
     <div className=" gap-2 absolute flex  flex-col justify-around items-center m-auto top-30 z-10  right-[20vw] left-[20vw]">
                 <p className=" text-4xl md:text-6xl lg:text-6xl  font-extrabold">land the <span className=" text-blue-600">Job</span> you <span className=" text-red-600">Love</span></p>
                 <p className=" text-[18px] md:text-[24px] lg:text-[24px]">Your Next <span>Opportunities</span> Awaits Here !!</p>
        <Button className=" text-center self-center bg-blue-600">Explore More...</Button>
      </div>
     <Swiper
         
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        style={style}
        modules={[Autoplay, Pagination, Navigation]}
        // className={style?"one":"may"}
        className=' h-full'
      >
        
             {heroImages.map((item, index) => (
                <SwiperSlide  key={index}>
                  <div className="m-auto backdrop-blur-sm w-[98vw] flex object-cover contrast-100 -z-10 bg-slate-500 h-[320px] shadow-xl border  rounded-sm md:h-[320px] lg:h-[320px]  ">
                          
                  <Image alt="image" style={{}} src={`${item}`} width={500} height={200} className=" m-auto w-[98vw] flex object-top contrast-100 -z-10 bg-slate-500 h-[320px] shadow-xl border  rounded-sm md:h-[320px] lg:h-[320px]"></Image>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  </div>
                </SwiperSlide>
              ))}
        
        
      </Swiper>
   </div>
  );
}
