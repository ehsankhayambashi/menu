import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard/dashboard";
import AddCategoryForm from "./components/forms/addCategoryForm";
import Menu from "./components/menu";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Menu />} />
        {/* <Route path="/category/:id" element={<AddCategoryForm />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
