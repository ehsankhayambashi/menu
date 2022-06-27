import SideMenu from "./sideMenu";
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import AddItemForm from "../forms/addItemForm";
import CategoryList from "../editList/categoryList";
import AddCategoryForm from "../forms/addCategoryForm";
import ItemList from "../editList/itemList";

function Dashboard() {
  const [inactive, setInactive] = useState(false);
  return (
    <React.Fragment>
      <SideMenu
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
      <div className={`dashboard-container ${inactive ? "inactive" : ""}`}>
        <Routes>
          <Route path="category/:id" element={<AddCategoryForm />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="item/:id" element={<AddItemForm />} />
          <Route path="item" element={<ItemList />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
