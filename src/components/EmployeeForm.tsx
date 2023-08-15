"use client"
import React,{useState,useRef} from 'react'
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux'
import { Toast } from 'primereact/toast';
import { SetCurrentUser } from "@/redux/userSlice";
import { SetLoading } from '@/redux/loadingSlice';
import axios from 'axios';
const EmployeeForm = ({user}:any) => {
  const dispatch = useDispatch();
const toast = useRef<Toast>(null);
const [name,setName] = useState(user?.name||'')
const [email,setEmail] = useState(user?.email||'')
const [phone,setPhone] = useState(user?.phone||'')
const [obj,setObj] = useState(user?.carrierObjective||'')
const [eduForm,setEduForm]=useState(user?.education||[
  {
    qualification:"",
    institution:"",
    grade:""
  }
])

const [expForm,setExpForm]=useState(user?.experience||[
  {
    company:"",
    role:"",
    year:""
  }
])
const [skillForm,setSkillForm]=useState(user?.skills||[
  {
    technology:"",
    rating:"",
  }
])

interface eduType{
  qualification:string;
  institution:string;
  grade:string;
  [key: string]: string
}

interface skillType{
  technology:string;
  rating:string;
  [key: string]: string
}

interface expType{
  company:string;
  role:string;
  year:string;
  [key: string]: string
}

const handleChangeEdu = (id:Number, event: React.ChangeEvent<HTMLInputElement> ) => {
  const newInputFields = eduForm.map((i:eduType,index:any) => {
    if(id === index) {
      i[event.target.name] = event.target.value
    }
    return i;
  })
  
  setEduForm(newInputFields);
}

const handleAddEdu = () => {
  setEduForm([...eduForm,  {
    qualification:"",
    institution:"",
    grade:""
  }])
}

const handleRemoveEdu = (id:Number) => {
  const values  = [...eduForm];
  const result = values.filter((item,i)=>{
return i!==id
  });

  setEduForm(result);
}


const handleChangeSkill = (id:Number, event: React.ChangeEvent<HTMLInputElement> ) => {
  const newInputFields = skillForm.map((i:skillType,index:any) => {
    if(id === index) {
      i[event.target.name] = event.target.value
    }
    return i;
  })
  
  setSkillForm(newInputFields);
}

const handleAddSkill = () => {
  setSkillForm([...skillForm,  {
    technology:"",
    rating:"",
  }])
}

const handleRemoveSkill = (id:Number) => {
  const values  = [...skillForm];
  const result = values.filter((item,i)=>{
return i!==id
  });

  setSkillForm(result);
}



const handleChangeExp = (id:Number, event: React.ChangeEvent<HTMLInputElement> ) => {
  const newInputFields = expForm.map((i:expType,index:any) => {
    if(id === index) {
      i[event.target.name] = event.target.value
    }
    return i;
  })
  
  setExpForm(newInputFields);
}

const handleAddExp = () => {
  setExpForm([...expForm,  {
    company:"",
    role:"",
    year:"",
  }])
}

const handleRemoveExp = (id:Number) => {
  const values  = [...expForm];
  const result = values.filter((item,i)=>{
return i!==id
  });

  setExpForm(result);
}


       
const sub=async()=>{
  if(eduForm.length<1||
    skillForm.length<1||
    expForm.length<1||
    !name||
    !email||
    !phone||!obj){
      toast.current?.show({ severity: 'error', summary: 'Error', detail: "fill all forms" });
      return;
  }
  const values ={
    skills: skillForm,
    experience: expForm,
    education:eduForm,
    carrierObjective: obj,
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


// console.log(eduForm)
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
        <InputText id="city1" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
    </div>

      <div className="field mb-4 col-12">
        <label htmlFor="bio1" className="font-medium text-900">career objective</label>
        <InputTextarea id="bio1"  rows={5} autoResize value={obj} onChange={(e)=>setObj(e.target.value)}  />
    </div>
  

    <div className="text-xl text-900 ml-1 col-12">Education</div>
    {
eduForm.map((item:any,index:any)=>{
  return <div className="grid formgrid p-fluid mx-1 my-2" key={index}>
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="nickname1" className="font-medium text-900">Qualification</label>
        <InputText id="nickname1" type="text" name='qualification'  value={item.qualification}
              onChange={event => handleChangeEdu(index, event)} />
    </div>
  
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="email1" className="font-medium text-900">institution</label>
        <InputText id="email1" type="text" name='institution'   value={item.institution}
              onChange={event => handleChangeEdu(index, event)} />
    </div>

    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="email1" className="font-medium text-900">grade</label>
        <InputText id="email1" type="text" name='grade' value={item.grade}
              onChange={event => handleChangeEdu(index, event)} />
    </div>    
    <div className="col-12 md:col-3">
      <Button icon="pi pi-plus" onClick={handleAddEdu} className='mt-4 mx-3' />
      <Button icon="pi pi-minus" onClick={()=>handleRemoveEdu(index)} disabled={eduForm.length<2} className='mt-4' />
      </div>
    </div>

})


    }

<div className="text-xl text-900 ml-1 col-12">skills</div>
    {
skillForm.map((item:any,index:any)=>{
  return <div className="grid formgrid p-fluid mx-1 my-2" key={index}>
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="nickname1" className="font-medium text-900">Technology</label>
        <InputText id="nickname1" type="text" name='technology'  value={item.technology}
              onChange={event => handleChangeSkill(index, event)} />
    </div>
  
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="email1" className="font-medium text-900">rating</label>
        <InputText id="email1" type="text" name='rating'   value={item.rating}
              onChange={event => handleChangeSkill(index, event)} />
    </div>
  
    <div className="col-12 md:col-3">
      <Button icon="pi pi-plus" onClick={handleAddSkill} className='mt-4 mx-3' />
      <Button icon="pi pi-minus" onClick={()=>handleRemoveSkill(index)} disabled={skillForm.length<2} className='mt-4' />
      </div>
    </div>

})


    }

<div className="text-xl text-900 ml-1 col-12">Experience</div>
    {
expForm.map((item:any,index:any)=>{
  return <div className="grid formgrid p-fluid mx-1 my-2" key={index}>
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="nickname1" className="font-medium text-900">Company</label>
        <InputText id="nickname1" type="text" name='company'  value={item.company}
              onChange={event => handleChangeExp(index, event)} />
    </div>
  
    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="email1" className="font-medium text-900">Role</label>
        <InputText id="email1" type="text" name='role'   value={item.role}
              onChange={event => handleChangeExp(index, event)} />
    </div>

    <div className="field mb-4 col-12 md:col-3">
        <label htmlFor="email1" className="font-medium text-900">Year</label>
        <InputText id="email1" type="text" name='year' value={item.year}
              onChange={event => handleChangeExp(index, event)} />
    </div>    
    <div className="col-12 md:col-3">
      <Button icon="pi pi-plus" onClick={handleAddExp} className='mt-4 mx-3' />
      <Button icon="pi pi-minus" onClick={()=>handleRemoveExp(index)} disabled={expForm.length<2}className='mt-4' />
      </div>
    </div>

})


    }
   <Button label='Submit' onClick={sub} />
</div>
<Toast ref={toast} />
</div>
  )
}

export default EmployeeForm