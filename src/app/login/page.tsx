
"use client"

import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import Link from "next/link";
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadingSlice';

const Login = () => {
    // const { loading } = useSelector((state: any) => state.loading);
    const dispatch = useDispatch();
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const handleSubmit = async () => {
        if( !email || !password ){
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Add all inputs' });
            return;
        }
        dispatch(SetLoading(true));
                try {
                    const response = await axios.post('/api/auth/login', {
                      
                        email,
                        password,
                        
                      });
                    
                    //   console.log(response);
                //   console.log(res)
                  toast.current?.show({ severity: 'success', summary: 'Success', detail: response.data.message });
                router.push("/");
                }
                catch (err: any) {
                  console.log(err);
                 toast.current?.show({ severity: 'error', summary: 'Error', detail:err.response.data.message });
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
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
        <Link href='/register' className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
    </div>

    <div>
    {/* <label htmlFor="ingredien" className="ml-2">Sign in as</label> */}
    {/* <div className="flex flex-wrap gap-3 my-2">
    <div className="flex align-items-center">
        <RadioButton inputId="ingredient1" name="pizza" value="Employee" 
        onChange={(e) => setRole(e.value)} 
        checked={role === 'Employee'} />
        <label htmlFor="ingredient1" className="ml-2">Employee</label>
    </div>
    <div className="flex align-items-center">
        <RadioButton inputId="ingredient2" name="pizza" value="Employer" 
        onChange={(e) => setRole(e.value)} 
        checked={role === 'Employer'} />
        <label htmlFor="ingredient2" className="ml-2">Employer</label>
    </div>
    </div> */}
        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
        <InputText type="text" className="w-full mb-3" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText type="password" className="w-full mb-3" onChange={(e) => setPwd(e.target.value)} />

        <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" 
                checked={false} 
                // onChange={(e) => setChecked1(e.checked)}
                 />
                <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
        </div>

        <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleSubmit}/>

        <Divider align="center" className="my-3">
                <span className="text-600 font-normal text-sm">OR</span>
            </Divider>

            <Button label="Sign In with GitHub" icon="pi pi-github" className="w-full p-button-secondary" />
            <Toast ref={toast} />
    </div>
</div>
</div>
  )
}

export default Login