import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState('');


    const auth = JSON.parse(localStorage.getItem('auth'));
    const admin = auth.user.access;
    const permissions = admin !== 1 ? localStorage.getItem("permissions") || [] : [];

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:5000/api/v1/user/getusers", {
                headers: { "authtoken": token, "id": auth.user._id }
            });
            setAllUsers(res.data.users);
        } catch (error) {
            toast.error("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
        setIsModalOpen(true);
    };
    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'))
            const id = auth.user._id
            const res = await axios.get("http://localhost:5000/api/v1/team/getteams", {
                headers: { "authtoken": token, "id": id }
            });
            setTeams(res.data.teams);
        } catch (error) {
            toast.error("Error fetching teams");
        }
    };
    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'))
            const id = auth.user._id
            const res = await axios.get("http://localhost:5000/api/v1/role/get", {
                headers: { "authtoken": token, "id": id }
            });
            setRoles(res.data.roles);
        } catch (error) {
            toast.error("Error fetching Roles");
        }
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`http://localhost:5000/api/v1/user/delete-user/${userId}`, {
                headers: { "authtoken": token, "id": auth.user._id }
            });
            if (res.data.success) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'))
            const id = auth.user._id
            const res = await axios.put(`http://localhost:5000/api/v1/user/update-user/${editUser._id}`, editUser, {
                headers: { "authtoken": token, "id": id }
            });
            if (res.data.success) {
                toast.success("User updated successfully");
                setIsModalOpen(false);
                fetchUsers();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error updating user");
        }
    };

    const handleTeamAssign = (user) => {
        setSelectedUser(user);
        setIsTeamModalOpen(true);
    };
    const handleRoleAssign = (user) => {
        setSelectedUser(user);
        setIsRoleModalOpen(true);
    };


    useEffect(() => {
        fetchUsers();
        fetchTeams();
        fetchRoles();
    }, []);

    const assignTeam = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post("http://localhost:5000/api/v1/user/assign-team", {
                userId: selectedUser._id,
                teamId: selectedTeam
            }, {
                headers: { "authtoken": token, "id": auth.user._id }
            });
            if (res.data.success) {
                toast.success("Team assigned successfully");
                setIsTeamModalOpen(false);
                fetchUsers();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error assigning team");
        }
    };
    const assignRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post("http://localhost:5000/api/v1/user/assign-role", {
                userId: selectedUser._id,
                roleId: selectedRole
            }, {
                headers: { "authtoken": token, "id": auth.user._id }
            });
            if (res.data.success) {
                toast.success("Role assigned successfully");
                setIsRoleModalOpen(false);
                fetchUsers();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error assigning Role");
        }
    };

    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>
                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Manage Users</div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-2 py-3">Name</th>
                                    <th className="px-2 py-3">Email</th>
                                    <th className="px-2 py-3">Role</th>
                                    <th className="px-2 py-3">Teams</th>
                                    <th className="px-2 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers?.map(user => (
                                    <tr key={user._id} className="border-b">
                                        <td className="px-2 py-4">{user.name}</td>
                                        <td className="px-2 py-4">{user.email}</td>
                                        <td className='px-2 py-4 '>
                                            {user.roles.length > 0 ? user.roles.join(', ') : 'No Role'}
                                        </td>
                                        <td className='px-2 py-4 '>
                                            {user.teams.length > 0 ? user.teams.join(', ') : 'No Team'}
                                        </td>

                                        <td className="px-2 py-4">
                                            {(admin || permissions.includes("update_user")) && (
                                                <button className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleEdit(user)}>Edit</button>
                                            )}
                                            {(admin || permissions.includes("update_user")) && (
                                                <button className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleTeamAssign(user)}>Assign Team</button>
                                            )}
                                            {(admin || permissions.includes("update_user")) && (
                                                <button className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleRoleAssign(user)}>Assign Role</button>
                                            )}
                                            {(admin || permissions.includes("delete_user")) && (
                                                <button className="text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleDelete(user._id)}>Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl mb-4">Edit User</h2>
                        <input type="text" name="name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="w-full mb-2 p-2 border" />
                        <input type="password" name="email" onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} className="w-full mb-2 p-2 border" placeholder='Enter Password if you want to change' />
                        <div className="flex justify-end">
                            <button className="bg-green-600 text-white px-4 py-2 mr-2 rounded" onClick={handleSave}>Update</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {isTeamModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl mb-4">Assign Team to {selectedUser?.name}</h2>
                        <select className="w-full mb-2 p-2 border" onChange={(e) => setSelectedTeam(e.target.value)}>
                            <option value="">Select a team</option>
                            {teams.map(team => (
                                <option key={team._id} value={team._id}>{team.name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end">
                            <button className="bg-green-600 text-white px-4 py-2 mr-2 rounded" onClick={assignTeam}>Assign</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setIsTeamModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {isRoleModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl mb-4">Assign Role to {selectedUser?.name}</h2>
                        <select className="w-full mb-2 p-2 border" onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Select a Role</option>
                            {roles?.map(role => (
                                <option key={role._id} value={role._id}>{role.name}</option>
                            ))}

                        </select>
                        <div className="flex justify-end">
                            <button className="bg-green-600 text-white px-4 py-2 mr-2 rounded" onClick={assignRole}>Assign</button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setIsRoleModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ManageUser;
