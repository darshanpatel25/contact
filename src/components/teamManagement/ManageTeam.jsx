import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../layout/AdminMenu';
import axios from 'axios';

const ManageTeam = () => {
    const [allTeams, setAllTeams] = useState([]);


    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token')
            const auth = JSON.parse(localStorage.getItem('auth'))
            const id = auth.user._id
            const res = await axios.get("http://localhost:5000/api/v1/team/getteams", {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });
            setAllTeams(res.data.teams);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);


    const handleDelete = (teamId) => {

    };

    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">

                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>


                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Manage Team</div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Team Name</th>
                                    <th scope="col" className="px-6 py-3">Permissions</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTeams?.length > 0 ? (
                                    allTeams.map(team => (
                                        <tr key={team._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {team.name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {team.permissions?.length > 0
                                                    ? team.permissions.map(permission => permission.name).join(', ')
                                                    : 'No Permissions'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 m-2">
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 m-2"
                                                    onClick={() => handleDelete(team._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-500">No teams available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageTeam;
