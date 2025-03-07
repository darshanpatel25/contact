import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageRole = () => {
    const [allroles, setAllroles] = useState([]);
    const [editrole, setEditrole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const auth = JSON.parse(localStorage.getItem('auth'))
    const admin = auth.user.access
    if (admin != 1) {
        var permission = localStorage.getItem("permissions")

    }
    else {
        permission = []
    }


    const fetchroles = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;
            const res = await axios.get("http://localhost:5000/api/v1/role/get", {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });
            setAllroles(res.data.roles);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const fetchPermissions = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/permission/get-permissions");
            if (res.data.success) {
                setPermissions(res.data.permissions);
            } else {
                toast.error("Failed to load permissions");
            }
        } catch (error) {
            toast.error("Error fetching permissions");
        }
    };

    useEffect(() => {
        fetchroles();
        fetchPermissions();
    }, []);

    const handleEdit = (role) => {
        setEditrole(role);
        setSelectedPermissions(role.permissions.map(p => p._id));
        setIsModalOpen(true);
    };

    const handlePermissionChange = (id) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((perm) => perm !== id) : [...prev, id]
        );
    };

    const handleDelete = async (roleId) => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;
            const res = await axios.delete(`http://localhost:5000/api/v1/role/delete/${roleId}`, {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });
            if (res.data.success) {
                toast.success("role deleted successfully");
                fetchroles();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error deleting role");
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;
            const res = await axios.put(`http://localhost:5000/api/v1/role/update/${editrole._id}`, {
                name: editrole.name,
                permissions: selectedPermissions
            }, {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });
            if (res.data.success) {
                toast.success("role updated successfully");
                setIsModalOpen(false);
                fetchroles();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error updating role");
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>
                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Manage Roles</div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Role Name</th>
                                    <th className="px-6 py-3">Permissions</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allroles?.length > 0 ? (
                                    allroles.map(role => (
                                        <tr key={role._id} className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                                            <td className='px-6 py-4'>{role.name=="admin"?"All Permissions":role.permissions?.map(p => p.name).join(', ') || 'No Permissions'}</td>
                                            <td className="px-6 py-4">
                                                {role.name !== "admin" && (admin || permission.includes("update_role")) && (
                                                    <button
                                                        className="text-white bg-slate-600 hover:bg-slate-700 rounded-lg text-sm px-5 py-2.5 m-2"
                                                        onClick={() => handleEdit(role)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}

                                                {
                                                    role.name !== "admin" && (admin || permission.includes("delete_role")) && <button
                                                        className="text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 m-2"
                                                        onClick={() => handleDelete(role._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-500">No roles available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit role</h2>
                        <label className="block mb-2">role Name</label>
                        <input
                            type="text"
                            value={editrole.name}
                            onChange={(e) => setEditrole({ ...editrole, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />
                        <label className="block mb-2">Permissions</label>
                        <div className="border rounded-lg p-2 max-h-48 overflow-y-auto">
                            {permissions.map((perm) => (
                                <div key={perm._id} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id={perm._id}
                                        checked={selectedPermissions.includes(perm._id)}
                                        onChange={() => handlePermissionChange(perm._id)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={perm._id} className="text-gray-700 cursor-pointer">
                                        {perm.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};




export default ManageRole;

