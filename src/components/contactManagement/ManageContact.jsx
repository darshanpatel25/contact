import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageContact = () => {
    const navigate = useNavigate()

    const [allContacts, setAllContacts] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [currentContact, setCurrentContact] = useState({ name: '', number: '', email: '', birthday: '' });
    const auth = JSON.parse(localStorage.getItem('auth'))
    const admin = auth.user.access
    if(admin !=1){
        var permissions = localStorage.getItem("permissions")

    }
    else{
        permissions = []
    }
    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;

            const res = await axios.get("http://localhost:5000/api/v1/contact/getallcontacts", {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });

            setAllContacts(res.data.contacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (contactId) => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;

            const res = await axios.delete(`http://localhost:5000/api/v1/contact/delete/${contactId}`, {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchContacts();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            toast.error("Failed to delete contact.");
        }
    };

    const handleEditClick = (contact) => {
        setCurrentContact({
            _id: contact._id,
            name: contact.name || '',
            number: contact.number || '',
            email: contact.email || '',
            address: contact.address || ''
        });
        setEditModal(true);
    };

    const handleView = (contact) => {
        navigate(`/contactmanagement/view/${contact._id}`)
    }

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;

            const res = await axios.put(`http://localhost:5000/api/v1/contact/update`, currentContact, {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });

            if (res.data.success) {
                toast.success("Contact updated successfully");
                setEditModal(false);
                fetchContacts();
            } else {
                toast.error("Failed to update contact");
            }
        } catch (error) {
            console.error("Error updating contact:", error);
            toast.error("Failed to update contact");
        }
    };

    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>

                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Manage Contacts</div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Number</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allContacts.length > 0 ? (
                                    allContacts.map(contact => (
                                        <tr key={contact._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{contact.name}</td>
                                            <td className='px-6 py-4'>{contact.number}</td>
                                            <td className="px-6 py-4">
                                                {
                                                (admin || permissions.includes("update_contact")) && <button className="text-white bg-slate-600 hover:bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleEditClick(contact)}>Edit</button>
                                                }
                                                {
                                                   (admin ||  permissions.includes("read_contact")) && <button className="text-white bg-slate-600 hover:bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleView(contact)}>View</button>
                                                }
                                                {
                                                    (admin || permissions.includes("delete_contact")) && <button className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 m-2" onClick={() => handleDelete(contact._id)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-500">No contacts available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" className="w-full border p-2 rounded-md mb-4" value={currentContact.name} onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })} />
                        <label className="block text-sm font-medium">Number</label>
                        <input type="text" className="w-full border p-2 rounded-md mb-4" value={currentContact.number} disabled />
                        <label className="block text-sm font-medium">Email</label>
                        <input type="text" className="w-full border p-2 rounded-md mb-4" value={currentContact.email} onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })} />
                        <label className="block text-sm font-medium">Birthday</label>
                        <input type="date" className="w-full border p-2 rounded-md mb-4" value={currentContact.birthday} onChange={(e) => setCurrentContact({ ...currentContact, birthday: e.target.value })} />
                        <div className="flex justify-end">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => setEditModal(false)}>Cancel</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ManageContact;
