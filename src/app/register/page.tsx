
"use client"

import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Link from "next/link";

import { Toast } from 'primereact/toast';
        
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadingSlice';
        
const Register = () => {
    const dispatch = useDispatch();
    const toast = useRef<Toast>(null);
    const [userType, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const handleSubmit = async () => {
if(!name || !email || !password ||!userType){
    toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Add all inputs' });
    return;
}
dispatch(SetLoading(true));
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                userType,
              });
            
              console.log(response);
        //   console.log(res)
          response.status === 201 && toast.current?.show({ severity: 'success', summary: 'Success', detail: response.data });
        // router.push("/dashboard/login?success=Account has been created");
        }
        catch (err: any) {
          console.log(err);
          toast.current?.show({ severity: 'error', summary: 'Error', detail:err.response.data });
          // console.log(err);
        }
        finally {
            dispatch(SetLoading(false));
          }
    }
  return (
    <div className='flex justify-content-center align-items-center min-h-screen overflow-hidden'>
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
   
    <div className="text-center mb-5">
        {/* <img src="assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" /> */}
        <div className="text-900 text-3xl font-medium mb-3">Sign up</div>
        <span className="text-600 font-medium line-height-3">have an account?</span>
        <Link href='/login' className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Login today!</Link>
    </div>

    <div>
    <label htmlFor="ingredien" className="ml-2">Sign up as</label>
    <div className="flex flex-wrap gap-3 my-2">
    <div className="flex align-items-center">
        <RadioButton inputId="ingredient1" name="pizza" value="employee" 
        onChange={(e) => setRole(e.value)} 
        checked={userType === 'employee'} />
        <label htmlFor="ingredient1" className="ml-2">Employee</label>
    </div>
    <div className="flex align-items-center">
        <RadioButton inputId="ingredient2" name="pizza" value="employer" 
        onChange={(e) => setRole(e.value)} 
        checked={userType === 'employer'} />
        <label htmlFor="ingredient2" className="ml-2">Employer</label>
    </div>
    </div>
    <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
        <InputText type="text" className="w-full mb-3"  onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
        <InputText type="text" className="w-full mb-3" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText type="password" className="w-full mb-3" onChange={(e) => setPwd(e.target.value)} />



        <Button label="Sign Up" icon="pi pi-user" className="w-full" onClick={handleSubmit} />
        <Toast ref={toast} />
    </div>
</div>
</div>
  )
}

export default Register