"use client"
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CompanySlider() {
  interface companyType {
    name: string,
    image: string,
    companylink: string
  }
  const heroImages = ["/images/companycontainer.jpg", "/images/jobslide1.jpg", "/images/jobslide3.jpg", "/images/jobslide4.jpg"];

  const dataCompany: companyType[] = [
    {
      name: "esewa",
      image: "/images/company2.png",
      companylink: "https://esewa.com.np/#/home"

    },
    {
      name: "neem infosys",
      image: "/images/company3.png",
      companylink: "https://neeminfosys.com/"

    },
    {
      name: "Verisk",
      image: "/images/verisk.png",
      companylink: "https://www.verisknepal.com.np/"

    }

  ]

  return (
    <Carousel className=" relative w-full  flex flex-col m-auto h-[60vh] ">
      <div className=" absolute w-full h-full flex  flex-col justify-center  items-center  m-auto z-10 ">
        <p className=" absolute top-4 underline text-4xl  font-extrabold text-blue-600 ">Companies</p>
        <div className=" flex justify-center items-center flex-col ">

          <div className=" flex  flex-wrap justify-around   items-center  w-full h-full lg:gap-[20vw] gap-5 ">
            {
              dataCompany.map((item, index) => {
                return (

                 <Link key={index} href={item.companylink}>
                   <Image key={index} alt="company image" src={item.image} width={100} height={60} className="mt-4 h-[60px] cursor-pointer  lg:h-[70px]  object-fill w-[150px] " />
                 </Link>

                )
              })
            }

          </div>
        </div>

      </div>
      <CarouselContent>
        {heroImages.map((item, index) => (
          <CarouselItem key={index}>
            <div className=" ">

              <Image alt="image" src={`${item}`} width={500} height={200} className="w-[100%] h-[60vh] flex object-right"></Image>
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
