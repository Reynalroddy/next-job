"use client"
import { SetLoading } from '@/redux/loadingSlice'
import axios from 'axios'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Toast } from 'primereact/toast';
import { SetCurrentUser } from "@/redux/userSlice";
const EmployerForm = ({user}:any) => {
const dispatch = useDispatch();
const toast = useRef<Toast>(null);
const [name,setName] = useState(user?.name||'')
const [email,setEmail] = useState(user?.email||'')
const [phone,setPhone] = useState(user?.phone||'')


const [year,setYear] = useState(user?.establishmentYear||'')
const [website,setWebsite] = useState(user?.website||'')


const [num,setNum] = useState(user?.companySize||'')
const [about,setAbout] = useState(user?.about||'')
const [addy,setAddy] = useState(user?.address||'')

       
  const sub=async()=>{
    if(!year||
      !num||
      !website||
      !about||
      !addy||

      !name||
      !email||
      !phone){
        toast.current?.show({ severity: 'error', summary: 'Error', detail: "fill all forms" });
        return;
    }
    const values ={
      establishmentYear: year,
      companySize: parseInt(num),
      website,
      about,
      address:addy,
      _id : user._id,
      userType :user.userType,
      name,
      email,
      phone
    }
    try {
      dispatch(SetLoading(true));
      const response = await axios.put("/api/auth/me", values);
      toast.current?.show({ severity: 'success', summary: 'Success', detail: "updated successfully"  })
      console.log(response.data.data)
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.response.data.message || "Something went wrong" });
    } finally {
      dispatch(SetLoading(false));
    }
  }

  return (
    <div className="col-12">
    <div className="grid formgrid p-fluid">
    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="nickname1" className="font-medium text-900">Name</label>
        <InputText id="nickname1" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
  
    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="email1" className="font-medium text-900">Email</label>
        <InputText id="email1" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </div>

    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="city1" className="font-medium text-900">Phone</label>
        <InputText id="city1" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
    </div>

    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="nickname1" className="font-medium text-900">Year</label>
        <InputText id="nickname1" type="text" value={year} onChange={(e)=>setYear(e.target.value)} />
    </div>
  
    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="email1" className="font-medium text-900">website</label>
        <InputText id="email1" type="text" value={website} onChange={(e)=>setWebsite(e.target.value)} />
    </div>

    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="city1" className="font-medium text-900">employee nummber</label>
        <InputText id="city1" type="text"  value={num} onChange={(e)=>setNum(e.target.value)}/>
    </div>

      <div className="field mb-4 col-12">
        <label htmlFor="bio1" className="font-medium text-900">About</label>
        <InputTextarea id="bio1"  rows={5} autoResize value={about} onChange={(e)=>setAbout(e.target.value)} />
    </div>

    <div className="field mb-4 col-12">
        <label htmlFor="bio1" className="font-medium text-900">Address</label>
        <InputTextarea id="bio1"  rows={5} autoResize value={addy} onChange={(e)=>setAddy(e.target.value)}/>
    </div>
                
    <Button label='Submit' onClick={sub} />
    </div>
    <Toast ref={toast} />
    </div>
    
  )
}

export default EmployerForm