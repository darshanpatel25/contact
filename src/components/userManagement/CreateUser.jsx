import React, { useState } from 'react';
import Layout from '../layout/Layout';
import AdminMenu from '../layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 0
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'role' ? (value === 'admin' ? 1 : 0) : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/v1/user/register",formData)

        if(res.data.success == true){
            toast.success(res.data.message)
        }
        else{
            toast.error(res.data.message)
        }
        console.log(formData);
    };

    return (
        <Layout>
            <div className="flex flex-wrap  text-slate-900 min-h-screen">
                <div className="md:w-1/6 bg-slate-200 p-4">
                    <AdminMenu />
                </div>
                <div className="md:w-5/6 p-6">
                    <div className='text-center text-3xl py-3 font-semibold'>Create User</div>
                    <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
                        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="name" className="absolute text-sm text-slate-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="email" className="absolute text-sm text-slate-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="password" className="absolute text-sm text-slate-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">Password</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <select name="role" id="role" className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" required onChange={handleChange}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label htmlFor="role" className="absolute text-sm text-slate-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">Role</label>
                            </div>
                            <button type="submit" className="text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateUser;
