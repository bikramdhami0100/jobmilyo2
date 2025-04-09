"use client"
import React, { useContext, useEffect, useState } from 'react';
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
import { MyEmployerLogInContext } from '../../context/EmployerLogInContext';
function PostAJob() {
  const { theme } = useTheme();
  const router=useRouter()
  const [rating, setRating] = useState(0)
  const [companyLogo, setCompanyLogo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [employerId,setEmployerId]=useState<any>("");
  const {employerData,organizationData}=useContext<any>(MyEmployerLogInContext);

  useEffect(() => {
      setMounted(true);
      if(typeof window!==undefined){
        const employerId = localStorage.getItem("employerId");
        setEmployerId(employerId);
      }
  }, []);
  const [form, setForm] = useState({
    jobtitle: "",
    site: "",
    postedby:"",
    description: "",
    no_of_workingemployee: "",
    no_of_office: "",
    industry: organizationData?.industry,
    qualification: "",
    interestedEmploymentTypes: "",
    no_vacancy: "",
    last_date: "",
    category: "",
    company_logo: organizationData?.logo,
    email: organizationData?.contact?.email,
    country: "",
    // number_of_post: "",
    experience: "",
    specialization_req: "",
    salary: "",
    company:organizationData?.organizationName,
    phonenumber:organizationData?.contact?.phone,
    website_url: organizationData?.contact?.website,
    address: organizationData?.headquarters,
    state: "",
    rating: 0
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
    if(employerData){
      try {
        const response = await fetch('/api/employer/post', {
          method: 'POST',
          body: JSON.stringify({form,employerData}),
        });
  
        if (response.ok) {
           
          toast({
            title: "Job added successfully",
            className:" text-black bg-white border-green-600 ",
            description: "Your job posting has been added.",
          });
          router.push("/employer/postjobslist");
          
        } else {
          toast({
            title: "Failed to add job",
            description: "An error occurred while adding the job.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "An error occurred while adding the job.",
          variant: "destructive",
        });
      }
    }else{
      alert("No user login")
    }
  };
useEffect(()=>{
 setForm((pre:any)=>({
  ...pre,
  rating
 }))
},[rating]);

// console.log(form)
if (!mounted) return null;
  return (
    <div className=" w-full mx-auto p-8 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-extrabold underline underline-offset-2 italic  mb-8">Details of Company</h1>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium ">Job Title</label>
            <Input name="jobtitle" value={form.jobtitle} onChange={handleChange} placeholder="Enter job title" />
          </div>
          <div>
            <label htmlFor="site">Site </label>
            <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="site" value={form.site} id="" onChange={handleChange}>

              {
                ["select site", "remote", "on-site"].map((item, index) => {
                  return (<option className=' '>{item}</option>)
                })
              }
            </select>
            {/* {formErrors.interestedEmploymentType && <span className=' text-red-600'>{formErrors.interestedEmploymentType}</span>} */}

          </div>
          {/* <div>
            <label className="block text-sm font-medium ">Number of Posts</label>
            <Input name="number_of_post" value={form.number_of_post} onChange={handleChange} placeholder="Enter number of posts" />
          </div> */}
          <div>
            <label className="block text-sm font-medium ">Number of Vacancy</label>
            <Input type="number" name="no_vacancy" value={form.no_vacancy} onChange={handleChange} placeholder="Enter number of posts" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Number of Working Employee</label>
            <Input name="no_of_workingemployee" type="number" value={form.no_of_workingemployee} onChange={handleChange} placeholder="Enter number of posts" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Number of Office</label>
            <Input name="no_of_office" type="number" value={form.no_of_office} onChange={handleChange} placeholder="Enter number of posts" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Industry</label>
            <Input name="industry" value={form.industry} onChange={handleChange} placeholder="Enter number of posts" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Description</label>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter job description" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Experience (optional)</label>
            <Input name="experience" value={form.experience} onChange={handleChange} placeholder=" Enter your Expreience" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Qualification or Education Required</label>
            <Input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Enter required qualification or education" />
          </div>
          <div>
            <label htmlFor="interestedEmploymentTypes">Employment Interested Types </label>
            <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="interestedEmploymentTypes" value={form.interestedEmploymentTypes} id="" onChange={handleChange}>

              {
                ["select ", "Full time", "Part time"].map((item, index) => {
                  return (<option className=' ' key={index}>{item}</option>)
                })
              }
            </select>
            {/* {formErrors.interestedEmploymentType && <span className=' text-red-600'>{formErrors.interestedEmploymentType}</span>} */}

          </div>
          <div>
            <label className="block text-sm font-medium ">Specialization (optional)</label>
            <Input name="specialization_req" value={form.specialization_req} onChange={handleChange} placeholder="Enter  specialization" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Last Date to Apply</label>
            <Input type='date' name="last_date" value={form.last_date} onChange={handleChange} placeholder="Enter last date to apply" />
          </div>
          <div>
            <label className="block text-sm font-medium ">Salary</label>
            <Input name="salary" value={form.salary} onChange={handleChange} placeholder="Enter salary" />
          </div>
          <div>

            <label className="block text-sm font-medium ">Job Category</label>
            <Input name="category" value={form.category} onChange={handleChange} placeholder="Enter number of posts" />
          </div>

          <div>
            <label className="block text-sm font-medium ">Company or Organization Name</label>
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
            <label className="block text-sm font-medium ">Company/Organization Logo</label>
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
          <Button type="submit" className="w-full max-w-md bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">Add Job</Button>
        </div>
      </form>
    </div>
  );
}

export default PostAJob;
