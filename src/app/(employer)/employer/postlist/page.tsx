// import React from 'react'

// function PostList() {
//   return (
//     <div>PostList</div>
//   )
// }

// export default PostList
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface JobDetailType {
  _id: string;
  Sr_No: number;
  jobtitle: string;
  number_of_post: string;
  qualification: string;
  experience: string;
  last_date: string;
  company: string;
  state: string;
  createdAt: string;
  Edit: string;
  Delete: string;
}

function JobList() {
  const { theme } = useTheme();

  const [jobs, setJobs] = useState<JobDetailType[]>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const itemsPerPage = 4;

  const fetchJobData = async (page: number) => {
    try {
      const result = (await axios.post("/api/joblist/", { page, limit: itemsPerPage })).data;
      setJobs(result.joblist);
      setTotalPages(Math.ceil(result.totalJobs / itemsPerPage));
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  const handlerDeleteItem=async(id:any)=>{
    console.log(id);
    const senddelete=(await axios.post("/api/joblist/delete",{id:id})).data;
    //  console.log(senddelete);
     if(senddelete){
      setTimeout(() => {
        fetchJobData(currentPage)
      }, 100);
     }
  }
  useEffect(() => {
    fetchJobData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="font-bold italic underline text-center text-3xl my-10">Job List/Details</h1>
      <div className="flex flex-col gap-4 min-h-screen overflow-hidden">
        {/* Table */}
        <div className="overflow-x-scroll">
          <table className="border-2">
            <thead>
              <tr className={`border-2 ${theme === "light" ? "bg-blue-400" : ""}`}>
                <th className="border-2 p-2">Sr.No</th>
                <th className="border-2 p-2">Job Title</th>
                <th className="border-2 p-2">No. Of Post</th>
                <th className="border-2 p-2">Qualification Required</th>
                <th className="border-2 p-2">Experience Required</th>
                <th className="border-2 p-2">Last Date To Apply</th>
                <th className="border-2 p-2">Company</th>
                <th className="border-2 p-2">State</th>
                <th className="border-2 p-2">Job Posted Date</th>
                <th className="border-2 p-2">Edit</th>
                <th className="border-2 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? jobs.map((item, index) => (
                <tr key={item._id} className={`${theme === "light" ? "bg-gray-300" : ""}`}>
                  <td className="border-2 p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="border-2 p-2">{item.jobtitle}</td>
                  <td className="border-2 p-2">{item.number_of_post}</td>
                  <td className="border-2 p-2">{item.qualification}</td>
                  <td className="border-2 p-2">{item.experience}</td>
                  <td className="border-2 p-2">{moment(item.last_date).format('MMMM Do YYYY')}</td>
                  <td className="border-2 p-2">{item.company}</td>
                  <td className="border-2 p-2">{item.state}</td>
                  <td className="border-2 p-2">{moment(item.createdAt).format('MMMM Do YYYY')}</td>
                  <td className="border-2 p-2 cursor-pointer text-blue-600 underline underline-offset-2">
                    <Link href={`/admin/joblist/${item._id}`}>
                      <Pencil />
                    </Link>
                  </td>
                  <td onClick={()=>{
                    handlerDeleteItem(item._id);
                  }} className="border-2 p-2 cursor-pointer text-blue-600 underline underline-offset-2">
                    
                      <Trash2 />
                  
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={11} className="text-center p-4">No jobs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4">
          <Pagination className="flex justify-start items-start">
            <PaginationContent>
              <PaginationItem >
                <PaginationPrevious
                  href="#"
                  hidden={currentPage===1}
                  
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                
                  // disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  hidden={currentPage===totalPages}
                  // disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default JobList;
