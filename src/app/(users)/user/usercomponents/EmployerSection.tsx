// import React from 'react'

// function EmployerSection() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default EmployerSection;
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Rating } from '@smastrom/react-rating'
import { Rating as ReactRating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CldUploadButton } from 'next-cloudinary';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import axios from 'axios';
function EmployerSection() {
  const { theme } = useTheme();
  const router=useRouter()
  // const interestedEmploymentTypes = 
  const [rating, setRating] = useState(0)
  const [showPost,setShowPost]=useState(false);
  const [companyLogo, setCompanyLogo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);
  const [form, setForm] = useState({
    company_logo: "",
    email: "",
    country: "",
    company: "",
    phonenumber:"",
    website_url: "",
    address: "",
    state: "",
    rating: 0,
  
  });

  const handleCompangLogo = (result: any) => {
    setForm((prevState: any) => ({
      ...prevState,
      company_logo: result.info.secure_url
    }));
    if (result.info.secure_url) {
      setCompanyLogo(true);
      toast({
        title: "Upload successful",
        description: "Company logo uploaded successfully",
      });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

  };
  
  const handleSubmit = async (event: any) => {

    event.preventDefault();


   
     console.log(form)
  };
useEffect(()=>{
 setForm((pre:any)=>({
  ...pre,
  rating
 }))
},[rating]);
const handlerPostedBy = async () => {
  try {
    const response = await axios.get("/api/checkvaliduser");
    const fullName = response.data?.user?.fullName;
    setForm((prevState: any) => ({
      ...prevState,
      postedby: fullName,
    }));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

useEffect(()=>{
  handlerPostedBy()
},[])
// console.log(form)
if (!mounted) return null;
  return (
    <div className=" w-full mx-auto p-8 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-extrabold underline underline-offset-2 italic  mb-8"> fill required  information </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium ">Company's Name</label>
            <Input name="company" value={form.company} onChange={handleChange} placeholder="Enter company or organization name" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Company's Phone number</label>
            <Input type="number" name="phonenumber" value={form.phonenumber} onChange={handleChange} placeholder="Enter company or organization name" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Rating </label>

            <ReactRating value={rating} style={{ maxWidth: 100 }} onChange={setRating} />
          </div>
          <div>
            <label className="block text-sm font-medium ">Company's Logo</label>
            <CldUploadButton
              className="w-full text-left border-2 p-1 rounded-md"
              onSuccess={handleCompangLogo}
              uploadPreset="wyyzhuyo"
            />
            {companyLogo ? <p className="text-green-600 text-left">Upload successful</p> : <p className="text-red-700 text-left">Please upload logo (.jpg/.png)</p>}
          </div>
          <div>
            <label className="block text-sm font-medium ">Website (optional)</label>
            <Input name="website_url" value={form.website_url} onChange={handleChange} placeholder="Enter website URL" />
          </div>

          <div>
            <label className="block text-sm font-medium ">Email</label>
            <Input name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Address</label>
            <Input name="address" value={form.address} onChange={handleChange} placeholder="Enter address" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Country</label>
            <Input name="country" value={form.country} onChange={handleChange} placeholder="Enter country" />
          </div>
          <div>
            <label className="block text-sm font-medium ">State</label>
            <Input name="state" value={form.state} onChange={handleChange} placeholder="Enter state" />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button type="submit" className="w-full max-w-md bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">Continue </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployerSection;
