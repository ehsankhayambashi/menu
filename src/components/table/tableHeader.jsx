import React from "react";

function TableHeader(props) {
  const { columns, sortChange, sortColumn } = props;

  //   function sortIconRender(column) {
  //     if (column.path !== sortColumn.path) return null;
  //     if (sortColumn.order == "asc") return <i className="bi bi-sort-down"></i>;
  //     else return <i className="bi bi-sort-down"></i>;
  //   }
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>
            {col.lable}
            {/* {sortIconRender(col)} */}
          </th>
        ))}
      </tr>
    </thead>
  );
}
// onClick={() => sortChange(col.path)}

export default TableHeader;
