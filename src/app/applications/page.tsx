"use client"
import { Toast } from 'primereact/toast';
import Crumb from '@/components/Crumb'
import { Button } from 'primereact/button'
import React,{useRef} from 'react'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadingSlice';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Applications = () => {
  const [applications, setApplications] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get( `/api/applications?user=${currentUser?._id}`);
      console.log(response.data.data);
      setApplications(response.data.data);
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message });
      // message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };


  React.useEffect(() => {
    fetchApplications();
  }, []);
  const dt = useRef(null);

  const statusBodyTemplate5 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`} >
{rowData.job.title}
    </p>
}
const statusBodyTemplate6 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`} >
{rowData.status}
    </p>
}
const statusBodyTemplate7 = (rowData:any) => {
    return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`} >
{rowData.job.user.name}
    </p>
}


// const statusBodyTemplate6 = (rowData:any) => {
//     return <p  className={`btn btn-primary text-primary font-bold cursor-pointer`}  onClick={() => deleteJob(rowData._id)}   >
// delete
//     </p>
// }
  // console.log(typeof(currentUser?._id))
  return (
    <div className="col-12">
       <Toast ref={toast} />
    {/* <div className="grid formgrid p-fluid"> */}
    <Crumb s2={'applications'}/>
<div className="flex flex-column md:align-items-center md:justify-content-between md:flex-row">
                        <div className="font-medium text-3xl text-900">Applications</div>
                    </div>

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
                      
                            <Column body={statusBodyTemplate5} header="title"></Column>    
                            <Column body={statusBodyTemplate6} header="status"></Column>
                            <Column body={statusBodyTemplate7} header="company"></Column>
                           {/* <Column field="jobType" header="jobType"></Column> */}
                        {/* <Column field="" header="state" body={statusBodyTemplate4} />*/}
                       
                       {/* <Column field="" header="Actions" body={statusBodyTemplate5} />
                        <Column field="" header="" body={statusBodyTemplate6} />
                        */}
                        {/* <Column field="" header="" body={statusBodyTemplate7} />
                        <Column field="" header="" body={statusBodyTemplate8} />
                        <Column field="" header="" body={statusBodyTemplate9} /> */}
                    </DataTable>
                    {/* </div> */}
    </div>
  )
}

export default Applications