
import type { Metadata } from "next";

import EDashboardSideBar from "./components/EDashboardSideBar";
import EmployerNavbar from "./components/EmployerNavbar";
import EmployerContext from "../context/EmployerLogInContext";

export const metadata: Metadata = {
  title: "Job मिल्यो Admin",
  description: "Job मिल्यो website is one of the popular websites for job seekers, developed by the K_DBMS Team of BSc.CSIT at Far Western University",
};

export default async function EmployerLayout({
  children,
}: any) {


  return (
    <>
       <div>
      
        <div id="employer" className="w-full h-full">
          {/* Navbar */}
          <EmployerContext>
          <div className="  backdrop-blur-lg fixed  z-30  flex justify-end items-end lg:w-[80%] w-full md:w-[80%]  right-0">
            <div className="  w-full ">
              <EmployerNavbar />
            </div>
          </div>
          {/* Main Content */}
          <div className="flex  flex-grow flex-row justify-between w-full h-full ">
            {/* Sidebar (hidden on small screens) */}
            <div className=" fixed top-0 hidden lg:flex md:flex w-[20%] min-h-screen ">
              <EDashboardSideBar />
            </div>

            <div className=" flex md:ml-[20%] lg:ml-[20%] flex-col flex-grow overflow-y-auto lg:mt-[70px] mt-[80px]">
           
              {children}
             
            </div>
          </div>
          </EmployerContext>
        </div>
     
      </div>
    </>
  );
}
