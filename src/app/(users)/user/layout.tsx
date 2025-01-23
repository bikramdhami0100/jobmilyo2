
import Footer from "@/app/(users)/user/components/Footer";
import Navbar from "@/app/(users)/user/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import PopUpClose from "./context/PopUpClose";
import EmployerLogInContext from "../../context/EmployerLogInContext";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <>
 
     <PopUpClose>
      <div id="userHome" className=" w-full h-full" >
        <div className=" w-full h-full">
          {/* navbar and toast message */}
          <div className="sm:z-20 w-full top-0 fixed z-20">
            <Navbar />
            <Toaster  />

          </div>
          <div className={`z-0 mt-[70px] w-full h-full `} >
            {children}
          </div>
          {/* footer */}
          <div className=" w-full">
            <Footer />
          </div>
        </div>
      </div>
      </PopUpClose>
     
    </>
  );
}
