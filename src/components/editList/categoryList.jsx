import React from "react";
import { Link } from "react-router-dom";
import CategoryTable from "./categoryTable";

function CategoryList() {
  return (
    <div className="container">
      <Link className="btn btn-outline-primary" to="/dashboard/category/add">
        + دسته بندی جدید
      </Link>
      <CategoryTable />
    </div>
  );
}

export default CategoryList;
