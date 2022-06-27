import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

function Table(props) {
  const { columns, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
