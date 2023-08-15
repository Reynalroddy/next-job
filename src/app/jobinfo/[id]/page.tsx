"use client"

import Crumb from '@/components/Crumb'
import { SetLoading } from '@/redux/loadingSlice'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Job = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    const toast = useRef<Toast>(null);
    const [jobData, setJobData] = React.useState<any>(null);
    const [applications = [], setApplications] = React.useState<any[]>([]);
    const router = useRouter();
    const { id } = useParams();
    const dispatch = useDispatch();
    const fetchJob = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await axios.get(`/api/jobs/${id}`);
          setJobData(response.data.data);
        } catch (error: any) {
          toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
        } finally {
          dispatch(SetLoading(false));
        }
      };

      const fetchApplications = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await axios.get(
            `/api/applications?job=${id}&user=${currentUser._id}`
          );
          setApplications(response.data.data);
        } catch (error: any) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
        } finally {
          dispatch(SetLoading(false));
        }
      };

      const onApply = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await axios.post(`/api/applications`, {
            job: jobData._id,
            user: currentUser._id,
            status: "pending",
          });
          toast.current?.show({ severity: 'success', summary: 'Success', detail: response.data.message });
       
        } catch (error: any) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
        } finally {
          dispatch(SetLoading(false));
        }
      };
    
      React.useEffect(() => {
        fetchJob();
        fetchApplications();
      }, []);
  return (
    <div className="col-12">
    <Crumb  />
    <Toast ref={toast} /> 
    <div className="font-medium text-3xl text-900 mb-3">{jobData?.title}</div>
    <div className="text-500 mb-5">{jobData?.description}</div>
    <ul className="list-none p-0 m-0">
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">job type</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{jobData?.jobType}</div>
            <div className="w-6 md:w-2 flex justify-content-end">
                {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Genre</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {/* <Chip label="Crime" className="mr-2" />
                <Chip label="Drama" className="mr-2" />
                <Chip label="Thriller" /> */}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
                {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">experience</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{jobData?.experience}</div>
            <div className="w-6 md:w-2 flex justify-content-end">
                {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
            </div>
        </li>

       <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Apply for job</div>
            {/* <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Robert De Niro, Al Pacino</div> */}
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Apply" icon="pi pi-pencil" className="p-button-text" onClick={onApply} 
                 disabled={
                    currentUser?.userType === "employer" || applications.length > 0
                  }
                />
            </div>
        </li>
     {applications.length > 0 &&
        <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
          
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                you have just applied.wait for response.</div>
       
        </li>
}
    </ul>
</div>
  )
}

export default Job