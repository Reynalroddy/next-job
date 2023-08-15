"use client"
import Crumb from '@/components/Crumb';
import { SetLoading } from '@/redux/loadingSlice';
import axios from 'axios';
// import Image from 'next/image'
// import { Button } from 'primereact/button'; 
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// export const get=async()=>{
//   try {
//     const tokens = cookies().get('token');
//     const res = await axios.get('http://localhost:3000/api/auth/me',{
//         headers:{
//           cookie:`token=${tokens?.value}`
//         }
//       }
//     )
//     console.log(res.data.data);
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

 const Home =()=>{
  const toast = useRef<Toast>(null);
  const [filters, setFilters] = React.useState({
    searchText: "",
    location: "",
  });
  const router = useRouter();
  const [jobs = [], setJobs] = React.useState([]);
  const dispatch = useDispatch();
  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs`);
      setJobs(response.data.data);
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
    } finally {
      dispatch(SetLoading(false));
    }
  };
  
  React.useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="grid">
      <div className="col-12">
      <Crumb />
        </div> 
      <Toast ref={toast} />
   {jobs.map((item:any,i)=>{
return <div className="col-12 md:col-6 lg:col-3" onClick={() => router.push(`/jobinfo/${item._id}`)}>
<div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
    <div className="flex justify-content-between mb-3">
        <div>
            <span className="block text-500 font-medium mb-3">{item.title}</span>
            <div className="text-900 font-medium text-xl">{item.jobType}</div>
        </div>
        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
            <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
        </div>
    </div>
    {/* <span className="text-green-500 font-medium">24 new </span> */}
    <span className="text-500">{item.desc}</span>
</div>
</div>
   }) 
 }
    </div>
  )
}


export default Home;