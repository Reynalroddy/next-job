"use client"
import { Toast } from 'primereact/toast';
import Crumb from '@/components/Crumb'
import { Button } from 'primereact/button'
import React,{useEffect, useRef} from 'react'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadingSlice';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
interface ModelProps {
  visible: boolean;
  showId:string;
  setVisible:(a:boolean) => void;

}

const Modal=({visible,setVisible,showId}:ModelProps)=>{
  const [applications, setApplications] = React.useState([]);
  const [stat, setStat] = React.useState('');


  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const dt = useRef(null);
  const toast = useRef<Toast>(null);
  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/applications?job=${showId}`);
      console.log(response.data.data);
      setApplications(response.data.data);
      setStat(response.data.data.status)
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
      // message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {

    try {
      dispatch(SetLoading(true));
      setStat(status);
      const response = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });
      toast.current?.show({ severity: 'success', summary: 'Success', detail: response.data.message });
      fetchApplications();
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
     
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const statusBodyTemplate5 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`} >
{rowData.user.name}
    </p>
}
const statusBodyTemplate6 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`} >
{rowData.user.email}
    </p>
}
 const statusBodyTemplate7 = (rowData:any) => {
     return  <select
     value={stat}
     onChange={(e) => onStatusUpdate(rowData._id, e.target.value)}
   >
     <option value="pending">Pending</option>
     <option value="shortlisted">Shortlisted</option>
     <option value="rejected">Rejected</option>
   </select>
 }
  useEffect(() => {
    fetchApplications();
  }, [])
  
return(
<Dialog header="Applicants" visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)}>

<DataTable value={applications} 
             ref={dt}
                  // filters={filters1}
                    // loading={loading1}
                    stripedRows
                     responsiveLayout="stack"
                    //  header={header1}
                    //  paginator
                    //  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    //  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,50]}
                     
                        >
                      
                            <Column body={statusBodyTemplate5} header="name"></Column>    
                            <Column body={statusBodyTemplate6} header="email"></Column>
                            <Column body={statusBodyTemplate7} header="status"></Column>
                           {/* <Column field="jobType" header="jobType"></Column> */}
                        {/* <Column field="" header="state" body={statusBodyTemplate4} />*/}
                       
                       {/* <Column field="" header="Actions" body={statusBodyTemplate5} />
                        <Column field="" header="" body={statusBodyTemplate6} />
                        */}
                        {/* <Column field="" header="" body={statusBodyTemplate7} />
                        <Column field="" header="" body={statusBodyTemplate8} />
                        <Column field="" header="" body={statusBodyTemplate9} /> */}
                    </DataTable>
            </Dialog>
)
}
const jobs = () => {
  const [visible, setVisible] = React.useState(false);
  const [showId, setShowId] = React.useState('');
  const [selectedJob = {}, setSelectedJob] = React.useState({} as any);
  const [showApplications = false, setShowApplications] =
    React.useState<boolean>(false); 
  const [jobs, setJobs] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs?user=${currentUser?._id}`);
      console.log(response.data.data);
      setJobs(response.data.data);
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
      // message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const deleteJob = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/jobs/${id}`);
      toast.current?.show({ severity: 'success', summary: 'Success', detail: response.data.message });
      fetchJobs();
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const show =(id:any)=>{
    setVisible(true);
    setShowId(id);
  }

  const dt = useRef(null);
  React.useEffect(() => {
    fetchJobs();
  }, []);

  const statusBodyTemplate5 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`}   onClick={() => router.push(`/jobs/edit/${rowData._id}`)} >
edit
    </p>
}


const statusBodyTemplate6 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`}  onClick={() => deleteJob(rowData._id)}   >
delete
    </p>
}

const statusBodyTemplate7 = (rowData:any) => {
  return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`}  onClick={()=>show(rowData._id)}   >
view application
  </p>
}
  // console.log(typeof(currentUser?._id))
  return (
    <div className="col-12">
       <Toast ref={toast} />
    {/* <div className="grid formgrid p-fluid"> */}
    <Crumb s2={'jobs'}/>
<div className="flex flex-column md:align-items-center md:justify-content-between md:flex-row">
                        <div className="font-medium text-3xl text-900">Jobs</div>
                        <div className="mt-3 md:mt-0">
                            <Button label="Add Job" onClick={() => router.push("/jobs/new")} className="p-button-outlined mr-2" icon="pi pi-user-plus" />
                            {/* <Button label="Save" icon="pi pi-check" /> */}
                        </div>
                    </div>

                    <DataTable value={jobs} 
             ref={dt}
                  // filters={filters1}
                    // loading={loading1}
                    stripedRows
                     responsiveLayout="stack"
                    //  header={header1}
                    //  paginator
                    //  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    //  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,50]}
                     
                        >
                      
                            <Column field="title" header="title"></Column>    
                            <Column field="location" header="location"></Column>
                            <Column field="experience" header="experience"></Column>
                           <Column field="jobType" header="jobType"></Column>
                        {/* <Column field="" header="state" body={statusBodyTemplate4} />*/}
                       
                       <Column field="" header="Actions" body={statusBodyTemplate5} />
                        <Column field="" header="" body={statusBodyTemplate6} />
                        <Column field="" header="" body={statusBodyTemplate7} />
                       
                        {/* <Column field="" header="" body={statusBodyTemplate7} />
                        <Column field="" header="" body={statusBodyTemplate8} />
                        <Column field="" header="" body={statusBodyTemplate9} /> */}
                    </DataTable>
                    {/* </div> */}

                    {visible &&
                    <Modal visible={visible} setVisible={setVisible} showId={showId} />}
    </div>
  )
}

export default jobs