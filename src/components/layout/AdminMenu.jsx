import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const admin = auth.user.access
  if (admin != 1) {
    var permissions = localStorage.getItem("permissions")

  }
  else {
    permissions = []
  }
  return (
    <div className="text-center py-4 bg-slate-100 rounded-lg shadow-md w-full max-w-sm ">
      <h4 className="text-xl font-semibold mb-4">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        {(admin || permissions.includes("create_user")) && <NavLink
          to="/usermanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create User
        </NavLink>}
        {(admin || permissions.includes("read_user")) && <NavLink
          to="/usermanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Users
        </NavLink>}
        {(admin || permissions.includes("create_team")) && <NavLink
          to="/teammanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create Team
        </NavLink>}
        {(admin || permissions.includes("read_team"))&& <NavLink
          to="/teammanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Teams
        </NavLink>}
        {(admin || permissions.includes("create_contact")) && <NavLink
          to="/contactmanagement/create"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Create Contact
        </NavLink>}
        {(admin || permissions.includes("read_contact")) && <NavLink
          to="/contactmanagement/manage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200 transition ${isActive ? "bg-gray-300 font-semibold" : "bg-white"}`
          }
        >
          Manage Contacts
        </NavLink>}

      </div>
    </div>
  );
};

export default AdminMenu;
