"use client"
import React, { useRef } from 'react'
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
        
const SideBar = () => {
    const btnRef20 = useRef(null);
    const btnRef21 = useRef(null);
    const btnRef22 = useRef(null);
  
  return (
<div className="min-h-screen flex relative lg:static surface-ground">
    <div id="app-sidebar-5" className="bg-gray-900 h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none">
        <div className="flex flex-column h-full">
            <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500" style={{ height: '60px' }}>
                <h3 className='text-white font-bold'>REYNAL</h3>
                {/* <img src="assets/images/blocks/logos/hyper-light.svg" alt="hyper-light" height={30} /> */}
            </div>
            <div className="mt-3">
                <ul className="list-none p-3 m-0">
                    <li>
                        <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                            <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                            <span className="font-medium inline text-base lg:text-xs lg:block">Home</span>
                            <Ripple />
                        </a>
                    </li>
                    <li>
                        <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                            <i className="pi pi-search mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                            <span className="font-medium inline text-base lg:text-xs lg:block">Search</span>
                            <Ripple />
                        </a>
                    </li>
                    <li>
                        <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                            <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                            <span className="font-medium inline text-base lg:text-xs lg:block">Team</span>
                            <Ripple />
                        </a>
                    </li>
                    <li className="relative">
                        <StyleClass nodeRef={btnRef20} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                            <a ref={btnRef20} className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                                <i className="pi pi-chart-line mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg p-overlay-badge"><Badge severity="danger" /></i>
                                <span className="font-medium inline text-base lg:text-xs lg:block">Reports</span>
                                <i className="pi pi-chevron-down ml-auto lg:hidden"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <ul className="list-none pl-3 pr-0 py-0 lg:p-3 m-0 lg:ml-3 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static lg:absolute left-100 top-0 z-1 bg-gray-900 shadow-none lg:shadow-2 w-full lg:w-15rem">
                            <li>
                                <StyleClass nodeRef={btnRef21} selector="@next" toggleClassName="hidden">
                                    <a ref={btnRef21} className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-chart-line mr-2"></i>
                                        <span className="font-medium">Revenue</span>
                                        <i className="pi pi-chevron-down ml-auto"></i>
                                        <Ripple />
                                    </a>
                                </StyleClass>
                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                    <li>
                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-table mr-2"></i>
                                            <span className="font-medium">View</span>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-search mr-2"></i>
                                            <span className="font-medium">Search</span>
                                            <Ripple />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                                    <i className="pi pi-chart-line mr-2"></i>
                                    <span className="font-medium">Expenses</span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                            <i className="pi pi-calendar mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                            <span className="font-medium inline text-base lg:text-xs lg:block">Events</span>
                            <Ripple />
                        </a>
                    </li>
                    <li>
                        <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                            <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                            <span className="font-medium inline text-base lg:text-xs lg:block">Options</span>
                            <Ripple />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-auto mx-3">
                <hr className="mb-3  border-top-1 border-gray-800" />
                <a className="p-ripple my-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                    <img src="assets/images/blocks/avatars/circle/avatar-f-1.png" alt="avatar-f-1" className="mr-2 lg:mr-0" style={{ width: '32px', height: '32px' }} />
                    <span className="font-medium inline lg:hidden">Amy Elsner</span>
                    <Ripple />
                </a>
            </div>
        </div>
    </div>
   <div className="min-h-screen flex flex-column relative flex-auto">
       <div className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border" style={{ height: '60px' }}>
            <div className="flex">
                <StyleClass nodeRef={btnRef22} selector="#app-sidebar-5" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                    <a ref={btnRef22} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                        <i className="pi pi-bars text-4xl"></i>
                        <Ripple />
                    </a>
                </StyleClass>
                {/* <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" className="border-none" placeholder="Search" />
                </span> */}
            </div>
            {/* <StyleClass nodeRef={btnRef23} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                <a ref={btnRef23} className="p-ripple cursor-pointer block lg:hidden text-700">
                    <i className="pi pi-ellipsis-v text-2xl"></i>
                    <Ripple />
                </a>
            </StyleClass> */}
            {/* <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                <li>
                    <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                        <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
                        <span className="block lg:hidden font-medium">Inbox</span>
                        <Ripple />
                    </a>
                </li>
                <li>
                    <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                        <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"><Badge severity="danger" /></i>
                        <span className="block lg:hidden font-medium">Notifications</span>
                        <Ripple />
                    </a>
                </li>
                <li className="border-top-1 surface-border lg:border-top-none">
                    <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                        <img src="assets/images/blocks/avatars/circle/avatar-f-1.png" alt="avatar-f-1" className="mr-3 lg:mr-0" style={{ width: '32px', height: '32px' }} />
                        <div className="block lg:hidden">
                            <div className="text-900 font-medium">Josephine Lillard</div>
                            <span className="text-600 font-medium text-sm">Marketing Specialist</span>
                        </div>
                        <Ripple />
                    </a>
                </li>
            </ul> */}
        </div>  
        <div className="p-5 flex flex-column flex-auto">
            <div className="border-2 border-dashed surface-border border-round surface-section flex-auto">

            </div>
        </div>
    </div> 
</div>
    
  )
}

export default SideBar