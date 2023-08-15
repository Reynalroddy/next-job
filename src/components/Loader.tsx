import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
const Loader = () => {
  return (
    <div className="flex justify-content-center align-items-center z-5" style={{
        position: 'fixed',
        inset: '0px',
        backgroundColor: 'rgba(0, 0, 0, 0.89)',
    }}>
    <ProgressSpinner />
</div>
  )
}

export default Loader