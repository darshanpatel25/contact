import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Unadmin from "../Unadmin";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    console.log(auth)
    const authCheck = async () => {
        const token = localStorage.getItem("token");
      
      const res = await axios.get("http://localhost:5000/api/v1/user/admin-test", {
        headers: {
          authtoken: token,
        },
      });
      if (res.data.success === true) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Unadmin />;
}