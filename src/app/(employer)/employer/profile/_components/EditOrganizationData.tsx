// import React from 'react'

// function EditOrganizationData() {
//   return (
//     <div>EditOrganizationData</div>
//   )
// }

// export default EditOrganizationData
"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
  organizationName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters." }),
  industry: z
    .string()
    .min(2, { message: "Industry must be at least 2 characters." }),
  headquarters: z
    .string()
    .min(2, { message: "Headquarters must be at least 2 characters." }),
  founded: z.preprocess((value) => (value ? new Date(value as string) : undefined), z.date({
    required_error: "Founded date is required.",
  })),
  employees: z.preprocess((value) => parseInt(value as string), z
    .number()
    .positive({ message: "Number of employees must be a positive number." })
    .int({ message: "Number of employees must be an integer." })),
  contact: z.object({
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
      .string()
      .min(7, { message: "Phone number must be at least 7 characters." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." }),
    website: z
      .string()
      .url({ message: "Invalid website URL." }),
  }),
  socialMedia: z.object({
    linkedin: z
      .string()
      .url({ message: "Invalid LinkedIn URL." })
      .optional(),
    twitter: z
      .string()
      .url({ message: "Invalid Twitter URL." })
      .optional(),
    facebook: z
      .string()
      .url({ message: "Invalid Facebook URL." })
      .optional(),
  }),
  logo:z.string().optional(),
  user:z.string().optional(),
  services: z.string().optional(),
  isActive: z.boolean(),
});

function EditOrganizationData({ organizationData, orgData, setOrgData,employerData }: any) {
  const [loader, setLoader] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      organizationName:organizationData?.organizationName|| employerData?.fullName,
      industry: organizationData?.industry,
      headquarters: organizationData?.headquarters,
      founded: organizationData?.founded,
      employees: organizationData?.employees,
      logo:organizationData?.logo|| employerData?.color,
      user:employerData?._id,
      contact: {
        email: organizationData?.contact?.email|| employerData?.email,
        phone: organizationData?.contact?.phone,
        address: organizationData?.contact?.address,
        website: organizationData?.contact?.website,
      },
      socialMedia: {
        linkedin: organizationData?.socialMedia?.linkedin,
        twitter:  organizationData?.socialMedia?.twitter,
        facebook:  organizationData?.socialMedia?.facebook,
      },
      services:  organizationData?.services,
      isActive: organizationData?.isActive|| employerData?.userVerify,
    },
  });

 async function onSubmit(data: z.infer<typeof FormSchema>) {
    // setLoader(true);
    console.log(data)
    const userId:string=employerData?._id;
    const logo:string=employerData?.color
    data.user=userId;
    data.logo=logo;

     if(employerData){
       const  sendData=(await axios.put("/api/employer/organization_details",{data,user:employerData})).data;
       console.log(sendData)
     }
    // Handle form submission logic here
  }
  console.log(organizationData,"This is from edit")

  return (
    <div className="p-4 backdrop-blur-xl ">
      <ScrollArea className=" h-[400px]">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 p-6 rounded-lg shadow-md justify-center items-center"
        >
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organization Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Industry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headquarters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headquarters</FormLabel>
                <FormControl>
                  <Input placeholder="Headquarters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founded</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    // value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Employees</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Employees" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact.website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="LinkedIn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="Twitter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="Twitter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services</FormLabel>
                <FormControl>
                  <Input placeholder="Seperated by comma.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className=" flex gap-2 justify-start items-center">
                <FormLabel>Is Active</FormLabel>
                <FormControl  >
                  <Checkbox
                    
                     className=" size-5 p-1 "
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            // disabled={loader}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex justify-center items-center"
          >
            {loader ? <Loader className="animate-spin mr-2" /> : null} Submit
          </Button>
        </form>
      </Form>
      </ScrollArea>
    </div>
  );
}

export default EditOrganizationData;
