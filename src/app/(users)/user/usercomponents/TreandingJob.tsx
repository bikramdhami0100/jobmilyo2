"use client"
import React, { useEffect, useState } from 'react';
import TreandingList from './TreandingList';
import SearchSection from './SearchSection';
import axios from "axios"
export type DataType = {
    category: string;
    image: string;
    location: string;
    salary: string;
    working_hour: string;
    company: string
};

function TreandingJob() {
    const [treandingJobs, setTreandingJobs] = useState<any>()
    const [search, setSearch] = useState<any>({
        PCompany: "",
        Location: "",
        SelectItem: "",
    });
    const TreandingHomeJobs = async () => {
        const received = (await axios.get("/api/user")).data;
        setTreandingJobs(received.data)

    }
    useEffect(() => {
        TreandingHomeJobs();
        return()=>{
            setTreandingJobs([])
        }
    }, [])


    const filterData = treandingJobs?.filter((item: any) => {
        if (search.SelectItem == "Select Field" || search.SelectItem == "Select Company") {
            search.SelectItem = ""
            return item
        }
        if (search.PCompany == "Select Company" || search.SelectItem == "Select Company") {
            search.PCompany = ""
            return item
        }
        if (search) {

            const matchesCategory = search.SelectItem ? item?.category?.toLowerCase().includes(search.SelectItem.toLowerCase()) : true;
            const matchesCompany = search.PCompany ? item?.company?.toLowerCase().includes(search.PCompany.toLowerCase()) : true;
            const matchesLocation = search.Location ? item?.address?.toLowerCase().includes(search.Location.toLowerCase()) : true;
            return matchesCategory && matchesCompany && matchesLocation;
        } else {
            return item
        }


    });

    return (
        <div>
            <SearchSection search={search} setSearch={setSearch} />
            <div className='shadow-md border w-full h-full mt-10'>
                <div className='relative  py-10 flex flex-wrap justify-center items-center'>
                    <h1 className=' mt-5  underline decoration-blue-600 absolute top-0 font-extrabold text-4xl text-center  mb-20'>
                        Trending Jobs in <span className='text-blue-600'>Job</span> <span className='text-red-600'>मिल्यो ?</span>
                    </h1>
                    <div className='my-10'>
                        {
                           treandingJobs ? (<TreandingList data={filterData} />) : 
                            (
                                <div className="flex cursor-pointer flex-wrap justify-center items-center gap-4 my-10">
                                {Array(8).fill(0).map((item, index) => (
                                  <div
                                    key={index}
                                    className="relative h-[350px] border ring-2 ring-inset ring-gray-400  duration-2000 animate-pulse hover:shadow-xl mx-4 my-4 p-4 w-[300px] shadow-md"
                                  >
                                    <div className="h-[30px] w-full bg-gray-400 rounded-md mb-2"></div>
                                    <div className="h-[2px] bg-gray-400 w-full mb-2"></div>
                                    <div className="w-[100px] h-[100px] bg-gray-400 rounded-full object-fill m-auto mb-4"></div>
                                    <div className="w-full h-[24px] bg-gray-400 rounded-md mb-2"></div>
                                    <div className="w-full h-[24px] bg-gray-400 rounded-md mb-2"></div>
                                    <div className="w-full h-[24px] bg-gray-400 rounded-md mb-4"></div>
                                    <div className="flex justify-between">
                                      <div className=" bg-gray-400 w-[60px] h-[32px] rounded-md"></div>
                                      <div className=" bg-gray-400 w-[60px] h-[32px] rounded-md"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TreandingJob;
