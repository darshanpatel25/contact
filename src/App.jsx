import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import SignupForm from './components/auth/Signup';
import LoginForm from './components/auth/Signin';
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/Private";
import CreateUser from "./components/userManagement/CreateUser";
import ManageUser from "./components/userManagement/ManageUser";
import CreateTeam from "./components/teamManagement/CreateTeam";
import ManageTeam from "./components/teamManagement/ManageTeam";
import CreateContact from "./components/contactManagement/CreateContact";
import ManageContact from "./components/contactManagement/ManageContact";
import ViewContact from "./components/contactManagement/ViewContact";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import Dashboard from "./components/Dashboard";
import CreateRole from "./components/roleManagement/CreateRole";
import ManageRole from "./components/roleManagement/ManageRole";

function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path='/signup' element={<SignupForm />} />
      <Route path="/usermanagement/create" element={<CreateUser />} />
      <Route path="/usermanagement/manage" element={<ManageUser />} />
      <Route path="/teammanagement/create" element={<CreateTeam />} />
      <Route path="/teammanagement/manage" element={<ManageTeam />} />
      <Route path="/contactmanagement/create" element={<CreateContact />} />
      <Route path="/contactmanagement/manage" element={<ManageContact />} />
      <Route path="/contactmanagement/view/:id" element={<ViewContact />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/rolemanagement/create" element={<CreateRole/>}/>
      <Route path="/rolemanagement/manage" element={<ManageRole/>}/>

      {/* <Route
        path="/usermanagement/create"
        element={
          <ProtectedRoute requiredPermissions={["create_user"]}>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usermanagement/manage"
        element={
          <ProtectedRoute requiredPermissions={["update_user", "read_user", "delete_user"]}>
            <ManageUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teammanagement/create"
        element={
          <ProtectedRoute requiredPermissions={["create_team"]}>
            <CreateTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teammanagement/manage"
        element={
          <ProtectedRoute requiredPermissions={["update_team", "read_team", "delete_team"]}>
            <ManageTeam />
          </ProtectedRoute>
        }
      />
       <Route
        path="/contactmanagement/create"
        element={
          <ProtectedRoute requiredPermissions={["create_contact"]}>
            <CreateContact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contactmanagement/manage"
        element={
          <ProtectedRoute requiredPermissions={["update_contact", "read_contact", "delete_contact"]}>
            <ManageContact />
          </ProtectedRoute>
        }
      />
       */}
      <Route path="*" element={<Unauthorized/>}/>
      </Routes>

  )
}

export default App
