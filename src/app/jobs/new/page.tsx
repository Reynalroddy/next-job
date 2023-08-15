"use client"
import Crumb from '@/components/Crumb'
import React,{useState,useRef} from 'react'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ListBox } from 'primereact/listbox';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadingSlice';
import axios from "axios";
import { useRouter } from "next/navigation";
const New = () => {
    const router = useRouter();
    // const toast = useRef<Toast>(null);
    const toast = useRef<Toast>(null);
    const dispatch = useDispatch();
const [title,setTitle] = useState('')
const [loc,setLoc] = useState('')
const [exp,setExp] = useState('')
const [desc,setDesc] = useState('')
const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Office', code: 'office' },
        { name: 'Remote', code: 'remote' },
        { name: 'Hybrid', code: 'hybrid' },
    ];

    
    const submit=async()=>{
        if(!title||
          !loc||
          !exp||
          !desc||
          !selectedCity){
            toast.current?.show({ severity: 'error', summary: 'Error', detail: "fill all forms" });
            return;
        }
        const values ={
            title,
            description: desc,
            location:loc,
          jobType:selectedCity['code'],
          experience:exp,
        }
        // console.log(values)
        try {
          dispatch(SetLoading(true));
          const response = await axios.post("/api/jobs", values);
          //     message.success(response.data.message);
          //     router.push("/jobs");
        //   console.log(response);
          toast.current?.show({ severity: 'success', summary: 'Success', detail: response?.data?.message  })
          router.push("/jobs");
        } catch (error: any) {
          toast.current?.show({ severity: 'error', summary: 'Error', detail: error.response.data.message || "Something went wrong" });
        } finally {
          dispatch(SetLoading(false));
        }
      }



  return (
    <div className="col-12">
         <Crumb s2={'jobs'} s3={'jobs/new'}/>
    <div className="grid formgrid p-fluid">
   
    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="nickname1" className="font-medium text-900">Job Title</label>
        <InputText id="nickname1" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>
  
    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="email1" className="font-medium text-900">Location</label>
        <InputText id="email1" type="text" value={loc} onChange={(e)=>setLoc(e.target.value)} />
    </div>

    <div className="field mb-4 col-12 md:col-4">
        <label htmlFor="city1" className="font-medium text-900">Experience</label>
        <InputText id="city1" type="text" value={exp} onChange={(e)=>setExp(e.target.value)} />
    </div>
    <div className="field mb-4 col-12 md:col-4">
    <label htmlFor="city1" className="font-medium text-900">Type</label>
    <ListBox value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" />
   </div>
    {/* <div className="field mb-4 col-12 md:col-4">
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
    </div> */}

      <div className="field mb-4 col-12">
        <label htmlFor="bio1" className="font-medium text-900">Description</label>
        <InputTextarea id="bio1"  rows={5} autoResize value={desc} onChange={(e)=>setDesc(e.target.value)} />
    </div>

    {/* <div className="field mb-4 col-12">
        <label htmlFor="bio1" className="font-medium text-900">Address</label>
        <InputTextarea id="bio1"  rows={5} autoResize value={addy} onChange={(e)=>setAddy(e.target.value)}/>
    </div> */}
                
    <Button label='Post'
     onClick={submit}
      />
    </div>
    <Toast ref={toast} />
    
    </div>
  )
}

export default New