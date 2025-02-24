import React from "react";
import Header from "./Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        {props.children}
      </main>
     
    </div>
  );
};

export default Layout;