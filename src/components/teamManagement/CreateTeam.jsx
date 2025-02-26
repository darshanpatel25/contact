import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch permissions from API
  useEffect(() => {
    async function fetchPermissions() {
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
    }
    fetchPermissions();
  }, []);

  
  const handlePermissionChange = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((perm) => perm !== id) : [...prev, id]
    );
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure only valid ObjectId strings are sent
    const validPermissions = selectedPermissions.filter(id => /^[0-9a-fA-F]{24}$/.test(id));

    try {
      const token = localStorage.getItem("token")
      const auth = JSON.parse(localStorage.getItem('auth'))
      const id = auth.user._id

      const res = await axios.post("http://localhost:5000/api/v1/team/create", {
        name: teamName,
        permissions: validPermissions, 
      },{headers:{
        "authtoken":token,
        "id":id
      }});

      if (res.data.success) {
        toast.success(res.data.message);
        setTeamName("");
        setSelectedPermissions([]);
        setDropdownOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error creating team");
    }
  };

  return (
    <Layout>
      <div className="flex flex-wrap text-slate-900 min-h-screen">
        {/* Sidebar */}
        <div className="md:w-1/6 bg-slate-200 p-4">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:w-5/6 p-6">
          <div className="text-center text-3xl py-3 font-semibold">Create Team</div>

          <div className="bg-slate-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Team Name */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="teamName"
                  className="absolute text-sm text-slate-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                  Team Name
                </label>
              </div>

              {/* Permissions Dropdown */}
              <div className="relative z-0 w-full mb-5">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="block w-full py-2.5 px-4 text-left bg-slate-600 text-white rounded-md focus:outline-none"
                >
                  Select Permissions
                </button>

                {dropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    <ul className="p-3 space-y-2 max-h-48 overflow-y-auto">
                      {permissions.map((perm) => (
                        <li key={perm._id} className="flex items-center space-x-3">
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
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition"
              >
                Create Team
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTeam;
