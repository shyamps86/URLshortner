import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {

  return (

    <div>
        <main className='container min-h-screen px-6 py-4 mx-auto' >
            <Header/>
            <Outlet/>
        </main>
        <div className='text-center text-3xl font-bold my-5'>
            your's shyam💗
        </div>
    </div>
  )
}

export default AppLayout