"use client"
import React, { useEffect, useRef, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ReactTyped } from "react-typed"

export function HeroAbout() {
  const heroImages = ["/images/herobg.png", "/images/jobslide3.jpg"];

  return (
    <Carousel className=" w-[100%] text-white  flex flex-col ">
      <div className=" gap-2 absolute flex  flex-col justify-around items-center m-auto top-[100px] z-10  right-[20vw] left-[20vw]">
        <p className=" text-[44px] md:text-6xl lg:text-6xl  font-extrabold">About us</p>
        <p className=" font-bold  text-center text-[20px] md:text-[26px] lg:text-[26px]">Home &gt; <span className={`font-extrabold `}>
          <ReactTyped
            backSpeed={50}
            onBegin={function noRefCheck() { }}
            onComplete={function noRefCheck() { }}
            onDestroy={function noRefCheck() { }}
            onLastStringBackspaced={function noRefCheck() { }}
            onReset={function noRefCheck() { }}
            onStart={function noRefCheck() { }}
            onStop={function noRefCheck() { }}
            onStringTyped={function noRefCheck() { }}
            onTypingPaused={function noRefCheck() { }}
            onTypingResumed={function noRefCheck() { }}
            strings={[
              "Explore",
              "About",
              "Contact",
              "Jobs",


            ]}
            loop
            typeSpeed={50}
            typedRef={function noRefCheck() { }}
          >

          </ReactTyped>

        </span></p>
      </div>
      <CarouselContent>
        {heroImages.map((item, index) => (
          <CarouselItem key={index}>
            <div className=" ">

              <Image alt="image" src={`${item}`} width={500} height={200} className=" m-auto w-full flex  object-right h-[300px]  "></Image>
              {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-0 m-auto  text-blue-600" />
      <CarouselNext className=" absolute right-0 m-auto  text-blue-600" />
    </Carousel>
  )
}
