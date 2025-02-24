import { useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) return;

        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/register", formData);

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md mt-10 border border-gray-200 ">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-gray-600">Contact</label>
                        <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none"
                            placeholder="Enter your contact number"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border ${
                                passwordMatch ? "border-gray-300" : "border-red-500"
                            } rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none`}
                            placeholder="Confirm your password"
                            required
                        />
                        {!passwordMatch && (
                            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white p-2 rounded-xl hover:bg-gray-900 disabled:bg-gray-400 transition"
                        disabled={!passwordMatch}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default SignupForm;
