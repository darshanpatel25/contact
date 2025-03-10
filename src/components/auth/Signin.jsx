import { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [auth,setAuth]= useAuth()

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/login", formData);
            
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
    
                localStorage.setItem("auth", JSON.stringify(res.data));
                localStorage.setItem("token", res.data.token);
    
                // ✅ Corrected API call
                const userRes = await axios.get("http://localhost:5000/api/v1/user/me", {
                    headers: { 
                        "authtoken": res.data.token, // ✅ Fixed
                        "id": res.data.user._id, // ✅ Fixed
                    },
                });
    
                if (userRes.data.success) {
                    localStorage.setItem("permissions", JSON.stringify(userRes.data.user.permissions));
                }
    
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong!");
        }
    };
    

    return (
        <Layout>
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md mt-10 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
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

                    
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-100 focus:ring focus:ring-gray-400 outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white p-2 rounded-xl hover:bg-gray-900 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default LoginForm;
