import { User2Icon } from 'lucide-react';
import React from 'react'
import ContactList from '../admin/contactlist/page';
import Image from 'next/image';
import { IconArrowsCross } from '@tabler/icons-react';

function DashContentBox({ item }: any) {
    console.log(item);
    return (
        <div className=' opacity-85 hover:duration-100 duration-100 hover:opacity-100  w-[300px] h-[200px] p-4 rounded-2xl gap-2  border flex-row shadow-md hover:shadow-2xl '>
            <div className=' flex flex-col justify-around items-start '>

                <div className=' flex flex-col justify-around items-baseline gap-6 '>
                    <h1 className=' font-bold text-3xl'>{item.name}</h1>

                    <div className=' text-center flex  justify-start items-center w-full '>
                        {item.name === "Total User" && <Image alt='image' src={"/dashboard/user.png"} height={50} width={60} className='  object-cover ' />}
                        {item.name === "Total Jobs" && <Image alt='image' src={"/dashboard/jobs.png"} height={50} width={60} className='  object-cover ' />}
                        {item.name === "Applied Jobs" && <Image alt='image' src={"/dashboard/applyjob.png"} height={50} width={60} className='  object-cover ' />}
                        {item.name === "Contacted User" && <Image alt='image' src={"/dashboard/contact.png"} height={50} width={60} className=' object-cover  ' />}
                        
                    </div>
                    <p className=' text-xl font-semibold '>{item.number}</p>
                </div>
            </div>
        </div>
    )
}

export default DashContentBox
