"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import ResetPassword from '../../components/ResetPassword'

function HanderResetPassword({ params }: { params: Promise<{ update: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      console.log(unwrappedParams.update, "this is id");
      setId(unwrappedParams.update);
    };

    fetchParams();
  }, [params]);
  console.log(id,"this is id ")
  return (
    <div className='flex flex-col justify-around items-center md:flex-row md:justify-around lg:justify-around lg:flex-row p-2'>
      <div className='grid-cols-2 justify-center items-center'>
        <div className='flex flex-col justify-center'>
          <div>
            <Image alt='login image' src={"/images/forget.svg"} height={400} width={400} className='h-full' />
          </div>
        </div>
      </div>

      {id && <ResetPassword id={id} />}
    </div>
  );
}

export default HanderResetPassword;
