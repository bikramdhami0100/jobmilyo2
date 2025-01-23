"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDispatch} from 'react-redux'
import axios from "axios"
import { useRouter } from 'next/navigation'
function SearchSection({search,setSearch}:any) {
    const [searchdata,setSearchData]=useState<any>()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    //  console.log(search ,"search")
    const SearchItems = ["Select Field", ...Array.from(new Set(searchdata?.map((data:any)=>{return data.category})))];
    const CompanyItems = ["Select Company", ...Array.from(new Set(searchdata?.map((data:any) => {return data.company})))];
    // const LocationItems = ["Select Location", ...(datas.map(data => data.location.split(', ')[0]))];
   const router=useRouter()


    const { theme } = useTheme();
    const dispatch = useDispatch();
    
    // const SearchItems = ["Select Field", ...new Set(datas.map(data => data.category))];
    const HandleMyFun = (e: any) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value })

    };
    const TreandingHomeJobs = async () => {
        const received = (await axios.get("/api/trendinghome")).data;
        setSearchData(received.data)
        //   if(received.state==200){
        //     setJobs(received.data)
        //   }
    }
    // console.log(searchdata)
    // 
    useEffect(() => {
        TreandingHomeJobs()
    }, [])
    if (!mounted) return null; 
    // const SearchItems=["Select Field","Web Technology","Data Science","App Development"]
    return (
        <div>
            <div className={`${theme=="light"?"bg-[#e2e3e5]":""} flex flex-row w-[96%] shadow-md border rounded-md p-10 m-auto mt-10`} >
                <div className='  flex gap-2 flex-wrap justify-evenly items-center w-full'>
                    <div className=' w-[200px]'>
                        <label htmlFor="interestedCategory"></label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="SelectItem" id="" onChange={HandleMyFun}>

                            {
                                SearchItems.map((item:any, index) => {

                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <Input name='Location' value={search.Location} placeholder='Location' width={200} className={`w-[200px] ${theme=="light"?" bg-white":""}`} onChange={HandleMyFun}  />
                    <div className=' w-[200px]'>
                        <label htmlFor="interestedCategory"></label>
                        <select className={`flex ${theme == "light" ? "bg-[rgb(255,255,255)]" : "bg-[rgb(2,8,23)] "} border w-full p-2 rounded-md outline-1 outline-black`} name="PCompany" id="" onChange={HandleMyFun}>

                            {
                                CompanyItems.map((item:any, index) => {
                                    return (<option className=' '>{item}</option>)
                                })
                            }
                        </select>


                    </div>
                    <Button onClick={() => {
                         router.push(`/user/search/query`)
                        // dispatch(SearchHomeJobs(JSON.stringify(search)));
                    }} className='w-[200px] bg-green-600 flex gap-2'><Search /> Search</Button>
                </div>
            </div>
        </div>
    )
}

export default SearchSection
