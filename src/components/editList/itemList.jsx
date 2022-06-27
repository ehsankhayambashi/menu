import React from "react";
import { Link } from "react-router-dom";
import ItemTable from "./ItemTable";

function ItemList() {
  return (
    <div className="container">
      <Link className="btn btn-outline-primary" to="/dashboard/item/add">
        + آیتم جدید
      </Link>
      <ItemTable />
    </div>
  );
}

export default ItemList;
