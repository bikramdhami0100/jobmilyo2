import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import AdminNavbar from "../components/AdminNavbar";
import AdminSideBar from "../components/AdminSideBar";
import CheckValidAdmin from "../components/CheckValidAdmin";

export const metadata: Metadata = {
  title: "Job मिल्यो Admin",
  description: "Job मिल्यो website is one of the popular websites for job seekers, developed by the K_DBMS Team of BSc.CSIT at Far Western University",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getServerSession();

  return (
    <>
      <CheckValidAdmin/>
      <div id="adminHome" className="w-full h-full">
        {/* Navbar */}
        <div className=" fixed z-10  flex justify-end items-end w-full">
          <div className="  w-full md:w-4/5 lg:w-4/5">
            <AdminNavbar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow flex-row justify-between w-full h-full ">
          {/* Sidebar (hidden on small screens) */}
          <div className=" fixed top-0 hidden lg:flex md:flex w-[20%] min-h-screen ">
            <AdminSideBar />
          </div>

          {/* Content */}
          <div className=" mt-[60px] flex md:ml-[20%] lg:ml-[20%] flex-col flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
