
import type { Metadata } from "next";
import MessageNavbar from "./_components/MessageNavbar";
import MessageSideBar from "./_components/MessageSideBar";


export const metadata: Metadata = {
  title: "Job मिल्यो Admin",
  description: "Job मिल्यो website is one of the popular websites for job seekers, developed by the K_DBMS Team of BSc.CSIT at Far Western University",
};

export default async function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      
      <div id="messaging" className="w-full h-full">
        {/* Navbar */}
        <div className=" fixed z-30 backdrop-blur-lg  flex justify-end items-end w-full">
          <div className="  w-full md:w-4/5 lg:w-4/5">
            <MessageNavbar/>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow flex-row justify-between w-full h-full ">
          {/* Sidebar (hidden on small screens) */}
          <div className=" backdrop-blur-lg fixed z-30 top-0 hidden lg:flex md:flex w-[20%] min-h-screen ">
            <MessageSideBar/>
          </div>
          
          <div className=" mt-[60px] flex md:ml-[20%] lg:ml-[20%] flex-col flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
