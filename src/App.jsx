import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import SignupForm from './components/auth/Signup';
import LoginForm from './components/auth/Signin';
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/Private";
import CreateUser from "./components/userManagement/CreateUser";
import ManageUser from "./components/userManagement/ManageUser";

function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path="/usermanagement/create" element={<CreateUser/>}/>
      <Route path="/usermanagement/manage" element={<ManageUser/>}/>
    </Routes>

  )
}

export default App
