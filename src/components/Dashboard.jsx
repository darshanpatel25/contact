import React from 'react'
import Layout from './layout/Layout'
import AdminMenu from './layout/AdminMenu'

const Dashboard = () => {
  return (
    <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>
                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Welcome to Admin Panel</div>
                </div>
            </div>
        </Layout>
  )
}

export default Dashboard
