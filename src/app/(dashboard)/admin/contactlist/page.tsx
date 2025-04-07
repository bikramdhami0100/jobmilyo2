
"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Trash2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import axios from 'axios'

interface ContactType {
  _id:any,
  Sr_No: number;
  userName: string;
  email: string;
  message: string;
}

function ContactList() {
  const { theme } = useTheme();
  const [contactList, setContactList] = useState<ContactType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const handleContact = async (page: number) => {
    try {
      const response = await axios.post("/api/contactlist/", { pages: page, limit: itemsPerPage });
      setContactList(response.data.contactlist);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  }
 const handlerDeleteContact=async(id:any)=>{
  //  console.log(id);
   const sendForDelete=(await axios.post("/api/contactlist/delete",{id,email:"bikramdhami334@gmail.com"})).data;
  //  console.log(sendForDelete)
   if(sendForDelete){
    setTimeout(() => {
      handleContact(currentPage);
    }, 100);
   }
 }
  useEffect(() => {
    handleContact(currentPage);
  }, [currentPage]);
  // console.log(contactList)
  return (
    <div>
      <h1 className='text-center text-3xl italic underline font-bold mt-10 mb-4'>Contact List/ Details</h1>
      <div className='flex flex-col gap-4 min-h-screen overflow-hidden'>
        {/* Table */}
        <div className='overflow-x-scroll md:overflow-x-hidden lg:overflow-x-hidden'>
          <table className='border-2 w-full'>
            <thead>
              <tr className={`border-2 ${theme === "light" ? "bg-blue-400" : ""}`}>
                <th className="border-2 p-2">Sr.No</th>
                <th className="border-2 p-2">User Name</th>
                <th className="border-2 p-2">User Email</th>
                <th className="border-2 p-2">Message</th>
                <th className="border-2 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                contactList.length>=1?contactList.map((item, index) => (
                <>
                  <tr key={item.Sr_No} className={`${theme === "light" ? "bg-gray-300" : ""} border-2`}>
                    <td className="border-2 p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="border-2 p-2">{item.userName}</td>
                    <td className="border-2 p-2">{item.email}</td>
                    <td className="border-2 p-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className='border-none text-blue-600 underline underline-offset-2'>View</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-gray-100 dark:text-white font-semibold'>
                          <AlertDialogHeader>
                            <AlertDialogDescription>
                              {item.message}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                    <td onClick={()=>{
                       handlerDeleteContact(item._id);
                    }} className="border-2 p-2 cursor-pointer text-blue-600 underline underline-offset-2">
                      <Trash2 />
                    </td>
                  </tr>
                </>
                )):" No any data available"
              }
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div>
          <Pagination className='flex justify-start items-start'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    // href="#" 
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  // href="#" 
                  onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default ContactList;

