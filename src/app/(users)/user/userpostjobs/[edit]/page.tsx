"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface JobsType {
  address: string;
  category: string;
  company: string;
  company_logo: string;
  country: string;
  createdAt: Date;
  description: string;
  email: string;
  experience: string;
  industry: string;
  interestedEmploymentTypes: string;
  jobtitle: string;
  jobupload: Date;
  last_date: Date;
  no_of_office: number;
  no_of_workingemployee: number;
  no_vacancy: number;
  number_of_post: number;
  qualification: string;
  rating: number;
  salary: string;
  site: string;
  specialization_req: string;
  state: string;
  updatedAt: Date;
  user: string;
  website_url: string;
  __v: number;
  _id: string;
}

const EditJobPage = ({ params}:any) => {
  const id=params.edit;
  console.log(id);
  const [formData, setFormData] = useState<any>("");
  const router=useRouter()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   const handlerFetchUserPostedJobbyId=async()=>{
      const userposteddatabyid=(await axios.get(`/api/userpostjobs?id=${id}`)).data;
      // console.log(userposteddatabyid, "data user posted ");
      setFormData(userposteddatabyid.data);
   }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assuming you have an API route to update the job information
      const response = await fetch(`/api/userpostjobs?id=${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Job updated successfully');
        router.push("/user/userpostjobs")
      } else {
        alert('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };
  useEffect(()=>{
   handlerFetchUserPostedJobbyId()
  },[])

  return (
    <div className="container mx-auto p-8">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Edit Job Details</h1> */}
      <form onSubmit={handleSubmit} className=" dark:text-white  p-6 rounded-lg shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
            <input
              type="text"
              name="jobtitle"
              value={formData?.jobtitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData?.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData?.salary}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData?.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData?.industry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData?.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* No. of Vacancies */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Vacancies</label>
            <input
              type="number"
              name="no_vacancy"
              value={formData?.no_vacancy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          
          {/* Job Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Job Description</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              className="w-full h-40 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>

          {/* Website URL */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Website URL</label>
            <input
              type="url"
              name="website_url"
              value={formData?.website_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Company Logo */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company Logo URL</label>
            <input
              type="text"
              name="company_logo"
              value={formData?.company_logo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div className="flex  ">
          <button
            type="submit"
            className="px-6 py-2 self-end items-end  bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;
