"use client"

import Link from 'next/link'
import React from 'react'
interface Proptypez {
    s2?: string;
    s3?: string;
    s4?: string;
}

const Crumb = (props:Proptypez) => {
  return (
    <ul className="list-none p-3 m-0 surface-card flex align-items-center font-medium overflow-x-auto">
                    <li className="pr-3">
                        <Link className="cursor-pointer" href={'/'}>
                            <i className="pi pi-home text-blue-500"></i>
                        </Link>
                    </li>
                    { props.s2 &&
                    <>
                   
                    <li className="px-2">
                        <i className="pi pi-angle-right text-500"></i>
                    </li>
                    <li className="px-2">
                        <Link href={`/${props.s2}`} className="cursor-pointer text-blue-500 white-space-nowrap">{props.s2}</Link>
                    </li>
                    </>
}
{ props.s3 &&
                    <>
                    <li className="px-2">
                        <i className="pi pi-angle-right text-500"></i>
                    </li>
                    <li className="px-2">
                    <Link href={`/${props.s3}`} className="cursor-pointer text-blue-500 white-space-nowrap">{props.s3}</Link>
                    </li>
                    </>
}
{ props.s4 &&
<>
                    <li className="px-2">
                        <i className="pi pi-angle-right text-500"></i>
                    </li>
                    <li className="px-2">
                    <Link href={`/${props.s4}`} className="cursor-pointer text-blue-500 white-space-nowrap">{props.s4}</Link>
                    </li>
                    </>
}
                </ul>
  )
}

export default Crumb