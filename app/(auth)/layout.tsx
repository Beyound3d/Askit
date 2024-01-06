import React from 'react'

const Authlayout = ({ 
    children }: { children: React.ReactNode; }) => {
    return (
        <div className='flex items-center justify-center h-screen mx-auto'>
            {children}
        </div>
    )
}

export default Authlayout;