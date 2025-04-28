"use client"
import React from 'react'
import Lottie from 'lottie-react';
import SearchImage from "./components/search.json";
import MainHomeHero from './components/MainHomeHero';
function Home1() {
  // Ask for permission
  return (
    <div>
      
      <div className=' m-auto flex  flex-col-reverse flex-wrap justify-between items-center md:flex-row lg:flex-row'>
        <div className=' w-full md:w-[40%] lg:w-[45%] '><MainHomeHero /></div>
        <div className=' w-full md:w-[50%] lg:w-[45%]'><Lottie animationData={SearchImage}></Lottie></div>
      </div>
    </div>
  )
}

export default Home1
