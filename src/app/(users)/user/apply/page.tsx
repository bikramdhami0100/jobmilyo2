import React from 'react'

import Image from 'next/image'
import TotalApplyJobByUser from './_components/TotalApplyJobByUser'

function TotalApply() {
  
  return (
    <div>
         <div className='  flex  flex-col  justify-center items-center my-10'>
         <h1 className=' text-3xl mt-10 underline font-bold   text-center '> Apply Jobs List</h1>
          <Image className="bg-transparent rounded-[100px] shadow-md h-[200px] w-[200px] " alt="No job applications" src="/applynow.jpg" height={100} width={100} />
          <TotalApplyJobByUser/>
         </div>
    </div>
  )
}

export default TotalApply