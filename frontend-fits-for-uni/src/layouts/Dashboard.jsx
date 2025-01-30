import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className='bg-white dark:bg-gray-900 dark:text-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]  '>
                {/**left for menu */}
                <div className=' dark:text-white py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
                    <UserMenu/>
                </div>


                {/**right for content */}
                <div className='dark:bg-gray-700 dark:text-white bg-white min-h-[75vh] dark:gray-700 dark:text-white'>
                    <Outlet/>
                </div>
        </div>
    </section>
  )
}

export default Dashboard
