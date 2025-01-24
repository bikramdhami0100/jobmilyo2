"use client"
import { MyEmployerLogInContext } from '@/app/(employer)/context/EmployerLogInContext'
import React, { useContext } from 'react'

function EmployerProfile() {
const {setEmployerData,employerData}=useContext<any>(MyEmployerLogInContext);

  return (
    <div>
         
    </div>
  )
}

export default EmployerProfile