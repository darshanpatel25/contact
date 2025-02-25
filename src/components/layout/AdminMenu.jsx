import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center py-4 bg-slate-100 rounded-lg shadow-md w-full max-w-sm ">
      <h4 className="text-xl font-semibold mb-4">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        <NavLink
          to="/usermanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create User
        </NavLink>
        <NavLink
          to="/usermanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/teammanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create Team
        </NavLink>
        <NavLink
          to="/teammanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Teams
        </NavLink>
        <NavLink
          to="/contactmanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create Contact
        </NavLink>
        <NavLink
          to="/contactmanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Contacts
        </NavLink>
        
      </div>
    </div>
  );
};

export default AdminMenu;
