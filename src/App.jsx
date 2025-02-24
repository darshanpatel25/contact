import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import SignupForm from './components/Signup';
import LoginForm from './components/Signin';

function App() {

  return (

    <Routes>
      <Route path='/ ' element={<Home/>} />
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/signin' element={<LoginForm/>}/>
    </Routes>
   
  )
}

export default App
