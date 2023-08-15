 "use client"
 import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import Crumb from '@/components/Crumb';
import { Button } from 'primereact/button';
import { SetLoading } from '@/redux/loadingSlice';
const Profile = () => {
    const { currentUser } = useSelector((state: any) => state.user);
   
  return (
    <>
<Crumb s2={'profile'}/>
    {currentUser?.userType ==='employee'?(<EmployeeForm user={currentUser}/>):(<EmployerForm user={currentUser}/>)}
    </>
  )
}

export default Profile