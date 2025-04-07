"use client"
import React, { useEffect, useState } from 'react'
import DashContentBox from '../../components/DashContent'
import axios from 'axios'
import { useAdminContext } from '../../context/AdminExistProvider'
function AdminDashoBoard() {
  const [totaldata, setTotalData] = useState<any>()
  const {adminId}=useAdminContext();
  const dataSummary = [
    {
      name: "Total Users",
      number: totaldata?.totaluser || null,
      emoji: "👥"
    },
    {
      name: "Total Jobs",
      number: totaldata?.totaljob || null,
      emoji: "💼"
    },
    {
      name: "Applied Jobs",
      number: totaldata?.totalAppliedjob ||0,
      emoji: "📄"
    },
    {
      name: "Contacted Users",
      number: totaldata?.totalContactuser|| 0,
      emoji: "📞"
    }
  ];

 console.log(adminId,"admin id from dashboard")

  const Totalhandler = async () => {
    const send = (await axios.get("/api/dashboard/",{params:{
      adminId:adminId,
      
    }})).data;
    console.log(send)
    setTotalData(send.data);
  }
  useEffect(() => {
    Totalhandler();
    return()=>{
      removeEventListener("beforeunload", Totalhandler)
    }
  }, []);
  return (
    <div>
      <h1 className=' text-3xl text-center italic my-10 font-bold underline'>Dashboard</h1>
      <div className=' flex flex-wrap  justify-around m-4 gap-6'>
        {
          dataSummary.map((item: any, index: any) => {
            return (<div className=' cursor-pointer hover:shadow-md lg:w-[20%] sm:w-[40%] font-bold border rounded-xl px-4 py-1'>
              <h1 className=' text-xl italic '>{item.name}</h1>
              <p className=' text-4xl my-2 mx-4'>{item.emoji}</p>
              <p>{item.number}</p>
            </div>)
          })
        }

      </div>

    </div>
  )
}

export default AdminDashoBoard
