"use client"
import React, { useContext, useState } from 'react'
import { MyEmployerLogInContext } from '../context/EmployerLogInContext'
import OrganizationDetails from './components/OrganizationDetails';
import EDashboard from './components/Dashboard';

function AdminHome() {
const {employerData,organizationData,loader, setLoader}=useContext<any>(MyEmployerLogInContext);

  return (
    <div>
       { !organizationData&& 
        <OrganizationDetails loader={loader} setLoader={setLoader}  employerData={employerData} />
       }  
       <EDashboard/>
    </div>
  )
}

export default AdminHome