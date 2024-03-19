import React from 'react'

export default function layout({children}) {
  return (
    <div className='container h-screen flex items-center justify-center w-2/5'>
        {children}
    </div>
  )
}
