import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import SignupForm from './components/auth/Signup';
import LoginForm from './components/auth/Signin';
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/Private";

function App() {

  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path='' element={<SignupForm />} />
      

    </Routes>

  )
}

export default App
