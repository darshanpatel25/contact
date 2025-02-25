import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext"
import { Outlet } from "react-router-dom";
import axios from "axios";
import Unauthorized from "../Unauthorized";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
        const token = localStorage.getItem('token')
      const res = await axios.get("http://localhost:5000/api/v1/user/user-test", {
        headers: {
          authtoken:token,
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

  return ok ? <Outlet /> : <Unauthorized />;
}