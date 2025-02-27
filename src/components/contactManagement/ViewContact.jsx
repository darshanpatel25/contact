import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewContact = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null); 

    const getContactDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            const auth = JSON.parse(localStorage.getItem('auth'));
            const id = auth.user._id;

            const res = await axios.get(`http://localhost:5000/api/v1/contact/get/${params.id}`, {
                headers: {
                    "authtoken": token,
                    "id": id
                }
            });

            setContact(res.data.contact); 
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    };

    useEffect(() => {
        getContactDetail();
    }, []);

    const handleBack = () => {
        navigate("/contactmanagement/manage");
    };

    return (
        <Layout>
            <div className="flex flex-wrap text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>

                <div className="md:w-5/6 p-6 flex justify-center items-center">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border">
                        <h2 className="text-2xl font-bold text-center mb-4">Contact Details</h2>

                        {contact ? (
                            <div className="space-y-3">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Name:</span>
                                    <span>{contact.name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Number:</span>
                                    <span>{contact.number || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Email:</span>
                                    <span>{contact.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Nickname:</span>
                                    <span>{contact.nickname || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Birthday:</span>
                                    <span>{contact.birthday || 'N/A'}</span>
                                </div>
                                <button onClick={handleBack} className="text-blue-600 hover:text-blue-800 mb-4">
                                    Back
                                </button>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Loading contact details...</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewContact;
