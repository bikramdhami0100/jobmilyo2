"use client"
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useTheme } from 'next-themes';
function HandleJob() {
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
  }
  const router = useRouter();
  // const { id } = router.query;
  const [jobData, setJobData] = useState<JobDetailType | null>(null);
  const [available,setavailable]=useState<any>();
  const {theme}=useTheme();
  const {editjob}:any=useParams()
  console.log(editjob)
  const params=new URLSearchParams();
  params.set("jobId",editjob);
  // initial data fetch for showing default value
  const HandleFetchData=async()=>{
    const result=await fetch(`/api/addjob/edit?${params}`,{
      method:"get"
    });
    const data= await result.json();
    setJobData(data.data)
  }
  useEffect(() => {
   HandleFetchData()
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value } as JobDetailType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(jobData)
    try {
      if (jobData) {
       const data= (await axios.post(`/api/joblist/edit`, {id:jobData._id,jobData,email:"bikramdhami334@gmail.com"})).data;
        // alert("Job updated successfully");
        router.push('/admin/joblist');  // Redirect to job list after saving
      }
    } catch (error) {
      console.error("Error updating job data:", error);
    }
  };

  return (
    <div>
        <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Job</h1>
      <form  className={` p-6 rounded shadow-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="jobtitle">
            Job Title
          </label>
          <input
            id="jobtitle"
            name="jobtitle"
            type="text"
            value={jobData?.jobtitle}
            defaultValue={jobData?.jobtitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="number_of_post">
            Number of Posts
          </label>
          <input
            id="number_of_post"
            name="number_of_post"
            type="text"
            value={jobData?.number_of_post}
            defaultValue={jobData?.number_of_post}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="qualification">
            Qualification Required
          </label>
          <input
            id="qualification"
            name="qualification"
            type="text"
            value={jobData?.qualification}
            defaultValue={jobData?.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="experience">
            Experience Required
          </label>
          <input
            id="experience"
            name="experience"
            type="text"
            value={jobData?.experience}
            defaultValue={jobData?.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="last_date">
            Last Date to Apply
          </label>
          <input
            id="last_date"
            name="last_date"
            type="date"
            value={jobData?.last_date}
            defaultValue={jobData?.last_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={jobData?.company}
            defaultValue={jobData?.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            defaultValue={jobData?.state}
            value={jobData?.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-between items-center">
          <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Save Changes
          </button>
          <button type="button" onClick={() => router.push('/admin/joblist')} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default HandleJob