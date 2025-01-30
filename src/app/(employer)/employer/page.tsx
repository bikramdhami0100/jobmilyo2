"use client"
import React, { useContext, useState } from 'react'
import { MyEmployerLogInContext } from '../context/EmployerLogInContext'
import OrganizationDetails from './components/OrganizationDetails';
import EDashboard from './components/Dashboard';

function AdminHome() {
const {employerData,organizationData}=useContext<any>(MyEmployerLogInContext);

console.log(organizationData,"organization")

  return (
    <div>
       { !organizationData&&
       <OrganizationDetails  employerData={employerData} />
       }  
       <EDashboard/>
    </div>
  )
}

export default AdminHome