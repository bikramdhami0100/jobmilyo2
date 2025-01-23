"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Lottie from "lottie-react";
import Love from "./fallinglove.json";
const Splash = ({ visible }:any) => {
  return visible ? (
    <div className=' fixed w-full h-screen bg-white flex justify-center items-center z-40'>
      <Image className=' z-10 self-center' alt='logo image' src={"/images/logo.png"} width={200} height={200}></Image>
       <Lottie className=' w-full h-full z-0 absolute' animationData={Love} ></Lottie>
    </div>
  ) : null;
}

function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 500 milliseconds
    }, 1000);
  
  },[])
  return (
    <div className=''>
      <Splash visible={showSplash} />
    </div>
  );
}

export default SplashScreen;
