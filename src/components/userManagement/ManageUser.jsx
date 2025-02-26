import React, { useState } from 'react'
import Layout from '../layout/Layout'
import AdminMenu from '../layout/AdminMenu'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageUser = () => {

    const [allUsers, setAllUsers] = useState()

    const getAllUsers = async () => {
        const token = localStorage.getItem('token')
        const auth = JSON.parse(localStorage.getItem('auth'))
        const id = auth.user._id
        const res = await axios.get("http://localhost:5000/api/v1/user/getusers", {
            headers: {
                "authtoken": token,
                "id": id
            }
        })
        let users = res.data.users
        console.log(res.data.users)
        setAllUsers(users)

    }

    // const handleEdit = () => {
    //     alert("Edits")
    // }

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token')
        const auth = JSON.parse(localStorage.getItem('auth'))
        const id = auth.user._id
        const res = await axios.delete(`http://localhost:5000/api/v1/user/delete-user/${userId}`,{
            headers: {
                "authtoken": token,
                "id": id
            }
        })

        if (res.data.success == true) {
            window.location.reload()
            toast.success(res.data.message)
        }
        else {
            toast.error(res.data.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])


    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>
                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Manage User</div>
                    <div>


                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            isAdmin
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Team
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers?.map(user => (
                                        <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.access ? "Admin" : "User"}</td>
                                            <td className='px-6 py-4'>  {user.teams.length > 0 ? user.teams.map(team => team.name).join(', ') : 'No Team'}</td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-2">

                                                    Edit

                                                </a>
                                                <a href="#" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-2" onClick={() => handleDelete(user._id)}>

                                                    Delete

                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ManageUser
